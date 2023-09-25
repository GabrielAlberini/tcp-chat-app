// MÓDULO SERVIDOR
import net from "node:net";
import readline from "readline-sync";
import { pushMessage } from "./controller.js";

const serverTCP = net.createServer();
const PORT = 7200;

serverTCP.on("connection", (socket) => {
  socket.on("data", (clientData) => {
    const clientMsg = clientData.toString();
    console.log("CLIENT --> ", clientMsg);
    let serverMsg = readline.question("SERVER --> ");
    const newMsg = {
      message: clientMsg,
      sentBy: process.argv[3],
      date: new Date().toLocaleString(),
    };
    pushMessage(newMsg);
    socket.write(serverMsg);
  });

  socket.on("close", () => console.log("Connection stopped"));
  socket.on("error", (err) => console.log(err));

  console.log("Client connected!");
});

// SERVER RUNNING
serverTCP.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
