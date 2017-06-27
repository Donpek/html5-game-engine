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
  this.spritesheet = null;

  this.curentFrame = null;
  this.frameDelayCounter = null;
  this.currentFrameIndex = 0;

  this.load = function()
  {
    this.image = new Image();
    this.image.src = file_path;
  };

  if(file_path instanceof Spritesheet)
  {
    this.spritesheet = file_path;
    this.image = this.spritesheet.image;
  }else
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

  this.drawAnimated = function(x, y, animation)
  {
    if(this.frameDelayCounter === null)
      this.frameDelayCounter = animation.sequence[this.currentFrameIndex].delay;

    if(this.frameDelayCounter++ == animation.sequence[this.currentFrameIndex].delay)
    {
      this.frameDelayCounter = 0;
      this.currentFrameIndex++;
      if(this.currentFrameIndex == animation.sequence.length)
      {
        this.currentFrameIndex = 0;
      }
      this.currentFrame = animation.sequence[this.currentFrameIndex].spriteID;
    }
    var sprite_coordinates = i2xy(this.currentFrame,
      this.spritesheet.widthInTiles);
      console.log(this.spritesheet.widthInTiles);
    C.ctx.drawImage(this.image, sprite_coordinates[0]*32,
      sprite_coordinates[1]*32, 32, 32, x, y, 32, 32);
  };
}

//----------------------------
//------------LOADING---------
//----------------------------

var spritesheets = [];
var spritesheets_loaded_callback = null;

function loadSpritesheets(file_path_array)
{
  var spritesheet = new Spritesheet(file_path_array[0]);
  file_path_array.shift();
  spritesheets.push(spritesheet);

  spritesheet.image.onload = function()
  {
    spritesheet.widthInTiles = spritesheet.image.width/TILE_W;

    if(file_path_array.length > 0)
    {
      loadSpritesheets(file_path_array);
    }else{
      console.log('Done loading spritesheets.');

      for(var i=0;i<spritesheets.length;i++)
        sprites.push(new Sprite(spritesheets[i]));

      spritesheets_loaded_callback();
    }
  };
}
