/*DEPENDENCIES
*   math-stuffs.js
*/

/*PURPOSE
*   provides a constructor for sprite objects and a few methods, such as
*     draw, drawStretched and drawRotated.
*/

const Sprite = function(file_path)
{
  this.image = null;
  this.widthInTiles = null;
  //Valid file path?
  if(file_path != null && file_path != undefined && file_path != "")
  {
    this.image = new Image();
    this.image.src = file_path;
  }else{
    console.log('Failed to load ' + file_path);
  }
}

const Drawable = function(sprite)
{
  this.sprite = sprite;

  this.curentFrame = null;
  this.frameDelayCounter = null;
  this.currentFrameIndex = 0;

  this.draw = function(x, y)
  {
    C.ctx.drawImage(this.sprite.image, x, y, TILE_W, TILE_H);
  };

  this.drawFromSheet = function(x, y, sprite_id)
  {
    const coords = i2xy(sprite_id, this.sprite.widthInTiles);
    C.ctx.drawImage(this.sprite.image, coords[0]*TILE_W, coords[1]*TILE_H,
      TILE_W, TILE_H, x, y, TILE_W, TILE_H);
  };

  this.drawStretched = function(x, y, w, h)
  {
    C.ctx.drawImage(this.sprite.image, x, y, w, h);
  }

  this.drawRotated = function(x, y, angle)
  {
    C.ctx.save();
    C.ctx.translate(1.5 * x, 1.5 * y);
    C.ctx.rotate(angle * TO_RADIANS);
    C.ctx.drawImage(this.sprite.image, -TILE_W/2, -TILE_H/2);
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
    const sprite_coordinates = i2xy(this.currentFrame,
      this.sprite.widthInTiles);
    C.ctx.drawImage(this.sprite.image, sprite_coordinates[0]*32,
      sprite_coordinates[1]*32, 32, 32, x, y, 32, 32);
  };
}

//----------------------------
//------------LOADING---------
//----------------------------

const sprites = [];
let on_sprites_loaded = null;

function loadSprites(file_paths)
{
  const sprite = new Sprite(file_paths[0]);
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
