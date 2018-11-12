var physicsLab = new Physics.world();
var gravity = Physics.behavior('constant-acceleration');
var bounds =  Physics.aabb(0, 0, 225, 260);
var renderer = Physics.renderer('canvas', {
                  el : 'bucket_left',
                  width: 225, height: 260, autoResize : false,
                  styles : {
                  'rectangle' : {
                  strokeStyle : 'hsla(0, 0%, 0%, 1)',
                  fillStyle : 'hsla(15, 76%, 50%, 0.4)',
                  lineWidth : 1,
                  angleIndicator : false
                  }}
                });

physicsLab.add(renderer);
physicsLab.render();
Physics.util.ticker.on(function(time, dt) {physicsLab.step(time);});
Physics.util.ticker.start();
physicsLab.on('step', function() {physicsLab.render();});
var interact = Physics.behavior('interactive', {el : 'bucket_left', maxVel : {x : 0.5, y : 0.5}, minVel : {x : -0.5, y : -0.5}});
physicsLab.add(gravity);
physicsLab.add(Physics.behavior('edge-collision-detection', {aabb : bounds, restitution : 0.4}));
physicsLab.add(Physics.behavior('body-impulse-response'));
physicsLab.add(Physics.behavior('body-collision-detection'));
physicsLab.add(Physics.behavior('sweep-prune'));
physicsLab.add(interact);

physicsLab.on('interact:move', function(d) {
   var moveables = physicsLab.find(function(b) {return b.name != 'no_move' && b.name != 'no_move_div';});
   interact.applyTo(moveables);
});

setTimeout(function(){
  var circle = Physics.body('circle', {x : 75, y : -10, vx : 0, vy : 0.1, radius : 15, cof : 0.8, mass : 0.09, restitution : 0.9, name : 'sball'});
  circle.view = new Image();
  circle.view.src = 'soccerball.png';
  physicsLab.add(circle);
}, 800);
