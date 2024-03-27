window.addEventListener('load', () => {
    registerSW();
  });
  async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('serviceworker.js');
      }
      catch (e) {
        console.log('serviceworker registration failed');
      }
    }
  }

  let installPrompt = null;
  const installButton = document.getElementById("pwaInstall");
  window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;
        showHidePwaPrompt('show');
    });
  installButton.addEventListener("click", async () => {
        if (!installPrompt) 
        { 
            return; 
        }
        await installPrompt.prompt();
        installPrompt = null;
    });


 
 
 
  // Register the Service Worker
//   const registerServiceWorker = async () => {
//     if ("serviceWorker" in navigator) 
//     {
//       try 
//       {
//         const registration = await navigator.serviceWorker.register("serviceworker.js", {
//           scope: "/",
//         });
//         if (registration.installing) 
//         {
//           console.log("Service worker installing");
//         } 
//         else if (registration.waiting) 
//         {
//           console.log("Service worker installed");
//         } 
//         else if (registration.active) 
//         {
//           console.log("Service worker active");
//         }
//       } 
//       catch (error) 
//       {
//         console.error(`Registration failed with ${error}`);
//       }
//     }
//   };
//   registerServiceWorker();
  