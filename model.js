// Recibe las directivas de controller.js y se conecta con las base de datos (history.json en nuestro caso) para procesar la información y retornar los valores solicitados. Es decir, que el modelo (model.js) se encarga de crear, leer, actualizar y borrar datos de la base de datos.

// Importar FS.
// Leer el JSON.
// Desarrollar 3 funciones que permitan leer, borrar y actualizar el JSON.
// Exportar las funciones usando la sintaxis de ECMAScript Modules (export {...}).

import * as fs from "fs";

const PATH = "./history.json";

function getDate() {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

function createMessageObj(message, userName) {
  const messageObj = {};

  messageObj.message = message;
  messageObj.sentBy = userName;
  messageObj.date = getDate();

  return messageObj;
}

const getHistory = () => {
  const messagesCollectionBuffer = fs.readFileSync(PATH);
  const messagesCollection = JSON.parse(messagesCollectionBuffer);

  return messagesCollection;
};

const eraseHistory = () => {
  fs.writeFileSync(PATH, "[]");

  return;
};

const pushMessage = (message, userName) => {
  const messagesCollection = getHistory();

  const messageObj = createMessageObj(message, userName);
  messagesCollection.push(messageObj);

  const historyJsonString = JSON.stringify(messagesCollection);
  fs.writeFileSync(PATH, historyJsonString);
};

export { getHistory, eraseHistory, pushMessage };
