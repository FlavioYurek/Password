console.log("contentScript.js cargado correctamente.");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log("Mensaje recibido desde popup.js: ", message);
  
  var action = message.action;
  
  var sensitiveFields = document.querySelectorAll("input[type='password'], input[type='text']"); // Busca campos de contraseña y texto
  console.log("Cantidad de campos sensibles encontrados: ", sensitiveFields.length);
  
  for (var i = 0; i < sensitiveFields.length; i++) {
    var sensitiveField = sensitiveFields[i];

    if (action == "show") {
      console.log("Cambiando campo sensible a tipo 'text'");
      sensitiveField.type = "text";
    }
    
    if (action == "copy") {
      console.log("Intentando copiar campo sensible");

      // Crear un campo de entrada oculto temporal
      var tempInput = document.createElement("input");
      tempInput.style.position = "absolute";
      tempInput.style.left = "-9999px";
      tempInput.value = sensitiveField.value; // Copiar el valor del campo sensible

      // Agregar el campo temporal al cuerpo del documento
      document.body.appendChild(tempInput);

      // Seleccionar y copiar el valor del campo temporal
      tempInput.select();
      var copied = document.execCommand("copy");

      // Verificar si la copia fue exitosa
      if (copied) {
        console.log("Campo sensible copiado exitosamente");
      } else {
        console.log("No se pudo copiar el campo sensible");
      }

      // Eliminar el campo temporal
      document.body.removeChild(tempInput);
    }
  }
});
