import http from "http";
import socketIo from "./socket.io";
import websocket from "./nativewebsocket";

export default { 
  init : app => {
    const httpServer = http.createServer(app);
    socketIo.init(httpServer);
    websocket.init(httpServer);
    return httpServer;
  }
}