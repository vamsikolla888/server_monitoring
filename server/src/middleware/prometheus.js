import promClient from 'prom-client';
import ResponseTime from 'response-time';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

// Create a Registry
const register = new promClient.Registry();

// Add default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({
  register,
  prefix: 'node_'
});

// HTTP request counter
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [register]
});

// Request duration histogram
const httpRequestDurationMs = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['method', 'path', 'status'],
  buckets: [10, 50, 100, 200, 300, 400, 500, 1000, 2000, 5000],
  registers: [register]
});

// Active requests gauge
const httpRequestsActive = new promClient.Gauge({
  name: 'http_requests_active',
  help: 'Number of active HTTP requests',
  labelNames: ['method'],
  registers: [register]
});

// Response size
const httpResponseSizeBytes = new promClient.Histogram({
  name: 'http_response_size_bytes',
  help: 'Size of HTTP responses in bytes',
  labelNames: ['method', 'path', 'status'],
  buckets: [100, 500, 1000, 5000, 10000, 50000, 100000],
  registers: [register]
});

// Memory usage gauge
const processMemoryGauge = new promClient.Gauge({
  name: 'process_memory_usage_bytes',
  help: 'Process memory usage in bytes',
  registers: [register],
  collect() {
    this.set(process.memoryUsage().heapUsed);
  },
});

// Prometheus middleware
const prometheusMiddleware = ResponseTime((req, res, time) => {
  if (req.path !== '/metrics') {
    // Increment request counter
    httpRequestsTotal.inc({
      method: req.method,
      path: req.route?.path || req.path,
      status: res.statusCode
    });

    // Observe request duration
    httpRequestDurationMs.observe(
      {
        method: req.method,
        path: req.route?.path || req.path,
        status: res.statusCode
      },
      time
    );

    // Track response size
    const responseSize = res.getHeader('content-length');
    if (responseSize) {
      httpResponseSizeBytes.observe(
        {
          method: req.method,
          path: req.route?.path || req.path,
          status: res.statusCode
        },
        parseInt(responseSize)
      );
    }
  }
});

// Middleware to track active requests
const activeRequestsMiddleware = (req, res, next) => {
  if (req.path !== '/metrics') {
    httpRequestsActive.inc({ method: req.method });
    res.on('finish', () => {
      httpRequestsActive.dec({ method: req.method });
    });
  }
  next();
};

// Metrics endpoint
const metricsEndpoint = async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    logger.error('Error generating metrics:', err);
    res.status(500).end();
  }
};

// Custom business metrics
const businessMetrics = {
  fileScans: new promClient.Counter({
    name: 'file_scans_total',
    help: 'Total number of file system scans',
    registers: [register]
  }),
  
  filesProcessed: new promClient.Counter({
    name: 'files_processed_total',
    help: 'Total number of files processed',
    registers: [register]
  }),

  scanDuration: new promClient.Histogram({
    name: 'file_scan_duration_seconds',
    help: 'Duration of file system scans in seconds',
    buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
    registers: [register]
  })
};

export {
  prometheusMiddleware,
  activeRequestsMiddleware,
  metricsEndpoint,
  businessMetrics,
  register
}; 