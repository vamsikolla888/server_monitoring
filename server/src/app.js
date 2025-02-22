import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import expressAsyncHandler from "express-async-handler";

/**@Internationalization */
import i18next from "i18next";
import Backend  from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
/**-------------- */


// import './utils/logger';
import { expressErrorLogger, requestLogger } from './utils/logger';


/**@Prometheus Monitoring */
import { 
  prometheusMiddleware, 
  activeRequestsMiddleware, 
  metricsEndpoint 
} from './middleware/prometheus';



/**@MyImports */
import apiRoutes from "./routes/index.routes";
import socketIo from "./sockets/socket.io";
import error from "./error";
import sockets from "./sockets";

const app = express();

/**@CommonMiddlwares */
app.use(cors());  
app.use(express.json(), error);
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Monitoring middleware
app.use(prometheusMiddleware);
app.use(activeRequestsMiddleware);

// Add request logger
app.use(requestLogger);
app.use(expressErrorLogger)

// Internationalization middleware
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: { loadPath: "./locales/{{lng}}.json" },
    detection: { order: ["querystring", "header"] }
  });

app.use(middleware.handle(i18next));

// Metrics endpoint
app.get('/metrics', metricsEndpoint); //Promothous & Grafana logging 

/**@Middlewares */

/**@ApiRoutes */
app.use("/api", apiRoutes);


/**@ErrorHandler */
app.use(error)

// const server = http.createServer(app);
const server = sockets.init(app);


logger.info('Server initialized successfully');
export default server;
