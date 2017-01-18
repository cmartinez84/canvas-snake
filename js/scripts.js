$(document).ready(function(){

  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext('2d');
  var w = $("#canvas").width();
  var h = $("#canvas").height();

  var d;
  var cw = 10;
  var food;
  var score;
  var snake_array;

  function create_snake(){
    var length = 20;
    snake_array = [];
    for(var i = length-1; i>= 0; i--){
      snake_array.push({x: i, y:0});
    }
  }

  function create_food(){
    food = {
      x: Math.round(Math.random()*(w-cw)/cw),
      y: Math.round(Math.random()*(h-cw)/cw),
    };
  }

  function init(){
    d = "right";
    create_snake();
    create_food();
    score = 0;
    if(typeof game_loop != "undefined"){
      clearInterval(game_loop);
    }
    game_loop = setInterval(paint, 60);
  }

  function paint(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,w,h);

    var nx = snake_array[0].x;
    var ny = snake_array[0].y;
    if(d == "right") nx++;
    else if(d == "left") nx--;
    else if(d == "up") ny--;
    else if(d == "down") ny++;
    if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw)
		{
      init();
			return;
		}

    if(food.x == nx && food.y ==ny){
      var tail = {
        x : food.x,
        y : food.y
      }
      create_food();
    }
    else{
      var tail = snake_array.pop();
    }
    tail.x = nx;
    tail.y = ny;
    snake_array.unshift(tail);

    for (var i = 0; i < snake_array.length; i++) {
      var c = snake_array[i];
      paint_cell(c.x, c.y)
    }
    paint_cell(food.x, food.y);
    crash_with();
  }

  function paint_cell(x,y){
    ctx.fillStyle = "blue";
    ctx.fillRect(x*cw, y*cw, cw, cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cw, y*cw, cw, cw);
  }

function crash_with(){
  snake_array.forEach(function(unit){
    snake_array.forEach(function(unit2){
      //so if two have the same measurements but they are NOT the same object!
      if(unit.x === unit2.x && unit.y === unit2.y && unit !== unit2){
        init();
      }
    });
  })
}

  $(document).keydown(function(e){
    var key = e.which;
    if(key == "37" && d != "right"){
      d = "left";
    }
    else if(key == "38" && d != "down"){
       d = "up";
     return false;}
    else if(key == "39" && d != "left") {
      d = "right";
    return false;}
    else if(key == "40" && d != "up"){
      d = "down";
    return false;}
  })
  init();

});
