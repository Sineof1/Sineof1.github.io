let deferredInstallPrompt;

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
  deferredInstallPrompt.prompt();
}
function add2Home(evt) {
  // Hide the install button, it can't be called twice.
  document.getElementById('add2Home').setAttribute('hidden', true);
}
