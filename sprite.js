/*DEPENDENCIES
*   math-stuffs.js
*/

/*PURPOSE
*   provides a constructor for sprite objects and a few methods, such as
*     draw, drawStretched and drawRotated.
*/

var Sprite = function(file_path)
{
  this.image = null;

  this.curentFrame = null;
  this.frameDelayCounter = null;
  this.currentFrameIndex = 0;

  //Valid file path?
  if(file_path != null && file_path != undefined && file_path != "")
  {
    this.image = new Image();
    this.image.src = file_path;
  }else{
    console.log('Failed to load ' + file_path);
  }

  this.draw = function(x, y)
  {
    C.ctx.drawImage(this.image, x, y, TILE_W, TILE_H);
  };

  this.drawFromSheet = function(x, y, sprite_id)
  {
    var coords = i2xy(sprite_id, this.image.widthInTiles);
    C.ctx.drawImage(this.image, coords[0]*TILE_W, coords[1]*TILE_H,
      TILE_W, TILE_H, x, y, TILE_W, TILE_H);
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
      this.widthInTiles);
    C.ctx.drawImage(this.image, sprite_coordinates[0]*32,
      sprite_coordinates[1]*32, 32, 32, x, y, 32, 32);
  };
}

//----------------------------
//------------LOADING---------
//----------------------------

var sprites = [];
var on_sprites_loaded = null;

function loadSprites(file_paths)
{
  var sprite = new Sprite(file_paths[0]);
  file_paths.shift();
  sprites.push(sprite);

  sprite.image.onload = function()
  {
    /*values that can only be initialized when the image has been loaded*/
    sprite.widthInTiles = sprite.image.width / TILE_W;
    /**/

    if(file_paths.length > 0)
    {
      loadSprites(file_paths);
    }else{
      console.log('Done loading sprites.');
      on_sprites_loaded();
    }
  };
}
