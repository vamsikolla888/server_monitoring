import ("./utils/logger");
import server from "./app";
import startUpProcesses from "./startup";
import "./services/pm2.service";


startUpProcesses().then(res => {
  console.log("All processes started successfully");
  server.listen(process.env.PORT, () => { console.log(`Server is running on PORT ${process.env.PORT}`)})
})