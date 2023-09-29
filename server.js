// MÓDULO SERVIDOR
import net from "net";
import readline from "readline-sync";
import * as controller from "./controller.js";

const serverTCP = net.createServer();
const PORT = 7204;
const userName = process.argv[3] || "Unknown";

serverTCP.on("connection", (socket) => {
  socket.on("data", (clientData) => {
    const clientMsg = clientData.toString();
    let serverMsg;

    console.log("CLIENT -->", clientMsg);

    serverMsg = readline.question("SERVER --> ");

    while (serverMsg == "--history") {
      const messagesCollection = controller.getHistory();
      console.log(messagesCollection);
      serverMsg = readline.question("SERVER --> ");
    }

    while (serverMsg == "--eraseMessages") {
      controller.eraseHistory();
      console.log("History has been deleted.");
      serverMsg = readline.question("SERVER --> ");
    }

    controller.pushMessage(serverMsg, userName);

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
