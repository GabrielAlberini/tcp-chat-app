// Recibe las solicitudes de los usuarios y las deriva al modelo para que encuentre los datos necesarios para llevar a cabo cierta acción. El controlador (controller.js) nunca debe tener acceso directo a la base de datos, sino a través del modelo (model.js). Sólamente le dice al modelo qué hacer mediante solicitudes.

// Importar el modelo
// Vincular las solicitudes de los usuarios con las funciones del modelo.

import * as model from "./model.js";

const getHistory = () => {
  const data = model.getHistory();
  if (data.length > 0) {
    return data;
  } else {
    return "No existe información en la base de datos.";
  }
};

const eraseHistory = () => model.eraseHistory();

const pushMessage = (message, userName) => model.pushMessage(message, userName);

export { getHistory, eraseHistory, pushMessage };
