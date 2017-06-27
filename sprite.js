/*DEPENDENCIES
*   math-stuffs.js
*   canvas.js
*/

/*PURPOSE
*   provides a constructor for sprite objects and a few methods, such as
*     draw, drawStretched and drawRotated.
*/

var Sprite = function(file_path)
{
  this.image = null;

  this.load = function()
  {
    this.image = new Image();
    this.image.src = file_path;
  };

  //Valid file path?
  if(file_path != null && file_path != undefined && file_path != "")
  {
    this.load();
  }else{
    console.log('Failed to load ' + file_path);
  }

  this.draw = function(x, y)
  {
    C.ctx.drawImage(this.image, x, y, TILE_W, TILE_H);
  };

  this.drawStretched = function(x, y, w, h)
  {
    C.ctx.drawImage(this.image, x, y, w, h);
  }

  this.drawRotated = function(x, y, angle)
  {
    C.ctx.save();
    C.ctx.translate(1.5 * x, 1.5 * y);
    C.ctx.rotate(angle * TO_RADIANS);
    C.ctx.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));
    C.ctx.restore();
  };
}
