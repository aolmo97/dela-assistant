self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  // Realiza tareas de instalación, como caché de recursos estáticos
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch intercepted for:", event.request.url);
  // Aquí puedes manejar las solicitudes de red y retornar respuestas en caché si es necesario
});
