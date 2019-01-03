var Engine2 = Matter.Engine, Render2 = Matter.Render, Runner2 = Matter.Runner, MouseConstraint2 = Matter.MouseConstraint, Mouse2 = Matter.Mouse, World2 = Matter.World, Bodies2 = Matter.Bodies;

var engine2 = Engine2.create();
var world2 = engine2.world;
var render2 = Render2.create({element : bucket_rght, engine : engine2, options : {width : 225, height : 260, showAngleIndicator : false, background : 'transparent', wireframes : false}});
Render2.run(render2);
var runner2 = Runner2.create();
Runner2.run(runner2, engine2);

var options2 = {isStatic : true};
world2.bodies = [];

World2.add(world2, [
  Bodies2.rectangle(0, 0.5, 450, 1, options2),
  Bodies2.rectangle(225, 0, 1, 520, options2),
  Bodies2.rectangle(0, 260.5, 450, 1, options2),
  Bodies2.rectangle(0.5, 0, 1, 520, options2),
])

var bball = Bodies2.circle(150, 30, 15, {density : 0.0005, frictionAir : 0.001, restitution : 0.8, friction : 0.1, render : {sprite : {texture : 'basketball.png'}}});
World2.add(world2, bball);

var mouse2 = Mouse2.create(render2.canvas);
var mouseConstraint2 = MouseConstraint2.create(engine2, {mouse: mouse2, constraint: {stiffness: 1, render: {visible: false}}});
World2.add(world2, mouseConstraint2);

render2.mouse = mouse2;
