# TCP CHAT

Desarrollar un programa que permita intercambiar mensajes en tiempo real a través de un servidor TCP/IP.

- Usar módulo NET para crear el servidor. LISTO

- Usar módulo readline para leer/escribir en la terminal y capturar los datos en tiempo real. LISTO

- Usar el módulo FS para almacenar todos los mensajes en una collection en formato JSON. Cada mensaje tiene que estar representado por un objeto con la siguiente estructura:

{
message: "Hola!! ¿Cómo estás?",
sentBy: María Antonieta,
date: 08/06/2023 14:53
}

- El campo sentBy tiene que tomar el dato capturado al invocar al módulo.js: node server.js --name userName.
- El campo date tiene que armarse valiendose del objeto Date. Investigar! Tiene que quedar con el mismo formato que en el ejemplo.

- Cada usuario debe poder enviar al otro ciertos comandos que ejecutarán acciones:

  ► --history | Devuelve el historial completo de la conversación
  ► --eraseMessages | Borra el historial completo y deja el JSON asi: [{}]
