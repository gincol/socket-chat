var socket = io();

// se recuperan parámetros de la url
var params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre y sala son necesaios");
}

// se crea el usuario según los parámetros de la url. Sólo se usa en la conexión
var usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

// Conexión al servidor, se reciben los usuarios conectados
socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("entrarChat", usuario, function (resp) {
    console.log("Usuarios conectados", resp);
  });
});

// Desconexión del servidor
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Escuchar el mensaje que se envió a todos
socket.on("crearMensaje", function (mensaje) {
  console.log("Servidor:", mensaje);
});

// Escuchar la lista de personas tras la entrada o salida de un usuario
socket.on("listaPersonas", function (personas) {
  console.log(personas);
});

// Escuchar mensajes privados
socket.on("mensajePrivado", function (mensaje) {
  console.log("Mensaje privado", mensaje);
});
