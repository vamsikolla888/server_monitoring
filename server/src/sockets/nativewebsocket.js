import { WebSocketServer } from "ws";





export default {
    init: server => {
        const wss = new WebSocketServer({ noServer: true });
        wss.on("connection", ws => {
            logger.info("Ws socket client connected");
            console.log("Ws socket connected");

            ws.on("message", msg => {
                console.log("MESSAGE", msg);
            })

            ws.on("error", err => {
                console.log("ERR", err);
            })
        })
        wss.on("error", err => {
            console.log("GLOBAL ERROR", err);
        })

        server.on("upgrade", (request, socket, head) => {
            if (request.url === "/ws") {
              wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit("connection", ws, request);
              });
            } else {
              socket.destroy();
            }
          });
    }
}