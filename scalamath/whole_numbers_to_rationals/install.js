var deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  deferredPrompt = e;
  showAddToHomeScreen();
});
function showAddToHomeScreen() {
  var a2hsBtn = document.querySelector(".ad2hs-prompt");
  a2hsBtn.style.display = "block";
  a2hsBtn.addEventListener("click", addToHomeScreen);
}
function addToHomeScreen() {
  var a2hsBtn = document.querySelector(".ad2hs-prompt");
  a2hsBtn.style.display = 'none';
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function(choiceResult){
    if (choiceResult.outcome === 'accepted') console.log('User accepted the A2HS prompt');
    else console.log('User dismissed the A2HS prompt');
  deferredPrompt = null;
  });
}
