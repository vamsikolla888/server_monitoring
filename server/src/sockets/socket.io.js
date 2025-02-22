import { Server } from "socket.io";

let io;

export default {
  init: (server) => {
    if (!io) {
      io = new Server(server, { cors: { origin: "*" } });
      io.on("connection", (socket) => {
        console.log("New client connected", socket.id);
        socket.on("message", (data) => {
          console.log("Received message from Socket.IO client:", data);
        });
        socket.on("disconnect", () => {
          console.log("Client disconnected", socket.id);
        });
      });
      io.on("error", err => console.log("ERROR", err));
    }
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized!");
    }
    return io;
  },
};
