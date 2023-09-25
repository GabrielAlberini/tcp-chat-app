// MÓDULO CLIENTE
import net from "net";
import readline from "readline-sync";
import * as controller from "./controller.js";

const OPTIONS = {
  port: 7202,
  host: "127.0.0.1",
};

const clientTCP = net.createConnection(OPTIONS);
const userName = process.argv[2] || "Unknown";

const sendMessage = () => {
  let clientMsg = readline.question("CLIENT --> ");

  while (clientMsg == "--history") {
    const messagesCollection = controller.getHistory();
    console.log(messagesCollection);
    clientMsg = readline.question("CLIENT --> ");
  }

  while (clientMsg == "--eraseMessages") {
    const isDeleted = controller.eraseHistory();
    isDeleted ? console.log("History has been deleted.") : console.log("Error");
    clientMsg = readline.question("CLIENT --> ");
  }

  controller.pushMessage(clientMsg, userName);

  clientTCP.write(clientMsg);
};

clientTCP.on("connect", () => {
  console.log("Connection successful!");
  sendMessage();
});

clientTCP.on("data", (serverData) => {
  const serverMsg = serverData.toString();
  console.log("SERVER -->", serverMsg);
  sendMessage();
});

clientTCP.on("error", (err) => console.log(err));
