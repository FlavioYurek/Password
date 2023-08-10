document.addEventListener("DOMContentLoaded", function() {
  var showButton = document.getElementById("show");
  var copyButton = document.getElementById("copy");

  showButton.addEventListener("click", function() {
    console.log("Botón 'Mostrar contraseñas' clickeado.");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("Query de pestañas realizada.");
      chrome.tabs.sendMessage(tabs[0].id, {action: "show"}, function(response) {
        console.log("Mensaje enviado a contentScript.js");
      });
    });
  });

  copyButton.addEventListener("click", function() {
    console.log("Botón 'Copiar contraseñas' clickeado.");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("Query de pestañas realizada.");
      chrome.tabs.sendMessage(tabs[0].id, {action: "copy"}, function(response) {
        console.log("Mensaje enviado a contentScript.js");
      });
    });
  });
});
