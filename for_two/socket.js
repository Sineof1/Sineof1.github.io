var socket = new WebSocket("wss://connect.websocket.in/v3/19751?apiKey=670wYG1yUKJ3xnJqDqOedaI0CVSbnRthl9xCVqE7wp0GLiujRL7oaCQSp5N2");

socket.addEventListener('open', function(event) {socket.send(JSON.stringify({guid: "test"}));});
socket.addEventListener('message', function(event) {handleMessage(JSON.parse(event.data));});

var userList = [];
var myPlayer;
var otherPlayerCur;
var myPlayerCur;

function login(user) {
   userList.push(user);
   myPlayer = Number(user[6]);
   if (userList.length === 2) {
      var firstListPlayer = Number(userList[0][6]);
      var secndListPlayer = Number(userList[1][6]);
      if (myPlayer >= firstListPlayer && myPlayer >= secndListPlayer) {
      $('.turn-shield').css('display', 'block');
      }
      else {
      $(`#player${String(myPlayer)}`).css('box-shadow', '0 0 5px green');
      $('.roll-button').css('pointer-events', 'all');
      socket.send(JSON.stringify({info : 'urPlayer2'}));
      }
   }
}
function handleMessage(message) {
   if (message.info === 'otherUser') logUser(message);
   else if (message.info === 'urPlayer2') setPlayer2();
   else if (message.info === 'turnSwitch') switchTurn();
   else if (message.info === 'playerMove') playerMove(message);
}
function logUser(msg) {
   userList.push(msg.user);
   $(`#${msg.user}`).css({'pointer-events' : 'none', 'opacity' : 1});
   $('.roll-button').css('pointer-events', 'all');
}
function setPlayer2() {
   $('.turn-shield').css('display', 'block');
   $(`#player${String(myPlayer)}`).css('box-shadow', '0 0 5px brown');
}
function switchTurn() {
   if ($('.turn-shield').css('display') === 'block') $('.turn-shield').css('display', 'none');
   else $('.turn-shield').css('display', 'block');
   $('.roll-button').css('pointer-events', 'all');
   $('.math-football-section').css('pointer-events', 'all');
}
function playerMove(msg) {
   $(`#${msg.loc}`).css('background-color', msg.color);
   otherPlayerCur = `#${msg.loc}`;
   var prevLoc = `#${msg.prevloc}`;
   $('.math-football-section').not(`.endzone, #${evt.target.id}, ${otherPlayerCur}, ${prevLoc}`).css('background-color', 'white');
}
