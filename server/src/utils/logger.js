import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import fs from 'fs';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  const ts = timestamp;
  const msg = stack || message;

  return `${ts} ${level.toUpperCase()} ${msg}`;
});

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Configure logger
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Console transport with colors
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleFormat
      )
    }),
    // Error log file transport
    new transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Combined log file transport
    new transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ],
  exitOnError: false
});

// Make logger global
global.logger = logger;

// Express middleware logger
const expressLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
  ignoreRoute: (req, res) => {
    // Ignore health check routes
    return req.url.includes('/api/health');
  }
});

// Express error logger
const expressErrorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
  meta: true,
  msg: '{{err.message}}',
  colorize: true
});

// Request logger middleware
const requestLogger = (req, res, next) => {
    logger.info({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        ip: req.ip,
        userAgent: req.get('user-agent')
    });
    next();
//   const start = Date.now();
//   res.on('finish', () => {
//     const duration = Date.now() - start;
//     logger.info({
//       method: req.method,
//       url: req.originalUrl,
//       status: res.statusCode,
//       duration: `${duration}ms`,
//       ip: req.ip,
//       userAgent: req.get('user-agent')
//     });
//   });

// next();
};

// Export logger instance and middleware
export {
  expressLogger,
  expressErrorLogger,
  requestLogger
};
