var Context =
{
  canvas: null,
  ctx: null,
  create: function(canvas_id)
  {
    this.canvas = document.getElementById(canvas_id);
    this.ctx = canvas.getContext('2d');
  }
}

$(document).ready(function()
{
  /*Episode 1*/
  Context.create('canvas');

  /**
  Context.ctx.beginPath();
  Context.ctx.rect(0,0,640,480);
  Context.ctx.fillStyle = '#123';
  Context.ctx.fill();
  /**/

  /*Epsiode 2*/
  var TILE = 'sprites/testTile.png';

  var image = new Sprite(TILE, false);
  var angle = 0;

  setInterval(function()
  {
    Context.ctx.fillStyle = 'black';
    Context.ctx.fillRect(0,0,640,480);
    image.draw(0,0);
    image.rotate(32,32,angle+=6);

  }, 100);
  /**/
});
