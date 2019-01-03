var Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner, MouseConstraint = Matter.MouseConstraint, Mouse = Matter.Mouse, World = Matter.World, Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;
var render = Render.create({element : bucket_left, engine : engine, options : {width : 225, height : 260, showAngleIndicator : false, background : 'transparent', wireframes : false}});
Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

var options = {isStatic : true};
world.bodies = [];

World.add(world, [
  Bodies.rectangle(0, 0.5, 450, 1, options),
  Bodies.rectangle(225, 0, 1, 520, options),
  Bodies.rectangle(0, 260.5, 450, 1, options),
  Bodies.rectangle(0.5, 0, 1, 520, options),
])

var sball = Bodies.circle(75, 30, 15, {density : 0.0005, frictionAir : 0.001, restitution : 0.55, friction : 0.1, render : {sprite : {texture : 'soccerball.png'}}});
World.add(world, sball);

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {mouse: mouse, constraint: {stiffness: 1, render: {visible: false}}});
World.add(world, mouseConstraint);

render.mouse = mouse;
