var physicsLab2 = new Physics.world();
var gravity2 = Physics.behavior('constant-acceleration');
var bounds2 =  Physics.aabb(0, 0, 220, 259);
var renderer2 = Physics.renderer('canvas', {
                  el : 'bucket_rght',
                  width: 225, height: 260, autoResize : false,
                  styles : {
                  'rectangle' : {
                  strokeStyle : 'hsla(0, 0%, 0%, 1)',
                  fillStyle : 'hsla(15, 76%, 50%, 0.4)',
                  lineWidth : 1,
                  angleIndicator : false
                  }}
                });

physicsLab2.add(renderer2);
physicsLab2.render();
Physics.util.ticker.on(function(time, dt) {physicsLab2.step(time);});
Physics.util.ticker.start();
physicsLab2.on('step', function() {physicsLab2.render();});
var interact = Physics.behavior('interactive', {el : 'bucket_rght', maxVel : {x : 0.5, y : 0.5}, minVel : {x : -0.5, y : -0.5}});
physicsLab2.add(gravity2);
physicsLab2.add(Physics.behavior('edge-collision-detection', {aabb : bounds, restitution : 0.7}));
physicsLab2.add(Physics.behavior('body-impulse-response'));
physicsLab2.add(Physics.behavior('body-collision-detection'));
physicsLab2.add(Physics.behavior('sweep-prune'));
physicsLab2.add(interact);

physicsLab2.on('interact:move', function(d) {
   var moveables = physicsLab2.find(function(b) {return b.name != 'no_move' && b.name != 'no_move_div';});
   interact.applyTo(moveables);
});
setTimeout(function(){
  var circle2 = Physics.body('circle', {x : 155, y : -10, vx : 0, vy : 0.1, radius : 16.5, cof : 0.8, mass : 0.13, restitution : 0.99, name : 'bball'});
  circle2.view = new Image();
  circle2.view.src = 'basketball.png';
  physicsLab2.add(circle2);
}, 800);
