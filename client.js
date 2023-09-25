// MÓDULO CLIENTE

import net from "net";
import readline from "readline-sync";
import { getHistory, eraseHistory, pushMessage } from "./controller.js";

const OPTIONS = {
  port: 7200,
  host: "127.0.0.1",
};

const clientTCP = net.createConnection(OPTIONS);

const sendMessage = () => {
  let message = readline.question("CLIENT --> ");
  while (message === "--history") {
    const parsedHistoryData = JSON.parse(getHistory());
    console.log(parsedHistoryData);
    message = readline.question("CLIENT --> ");
  }
  while (message === "--eraseMessages") {
    let deletedHistory = eraseHistory();
    console.log(deletedHistory);
    message = readline.question("CLIENT --> ");
  }

  const newMsg = {
    message: message,
    sentBy: process.argv[3],
    date: new Date().toLocaleString(),
  };
  clientTCP.write(message);
  pushMessage(newMsg);
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
