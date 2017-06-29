/*DEPENDENCIES
*   math-stuffs.js
*/

/*PURPOSE
*   provides a constructor for sprite objects and a few methods, such as
*     draw, drawStretched and drawRotated.
*/

const Sprite = function sprite_constructor(file_path)
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

const Drawable = function drawable_constructor(sprite)
{
  this.sprite = sprite;

  this.curentFrame = null;
  this.frameDelayCounter = null;
  this.currentFrameIndex = 0;

  this.whole = function draw_whole_image(x, y)
  {
    Drawable.prototype.ctx.drawImage(this.sprite.image, x, y, TILE_W, TILE_H);
  };

  this.sheet = function draw_from_sheet(x, y, sprite_id)
  {
    const coords = i2xy(sprite_id, this.sprite.widthInTiles);
    Drawable.prototype.ctx.drawImage(this.sprite.image, coords[0]*TILE_W, coords[1]*TILE_H,
      TILE_W, TILE_H, x, y, TILE_W, TILE_H);
  };

  this.stretch = function draw_stretched(x, y, w, h)
  {
    Drawable.prototype.ctx.drawImage(this.sprite.image, x, y, w, h);
  }

  this.rot = function draw_rotated(x, y, angle)
  {
    Drawable.prototype.ctx.save();
    Drawable.prototype.ctx.translate(1.5 * x, 1.5 * y);
    Drawable.prototype.ctx.rotate(angle * TO_RADIANS);
    Drawable.prototype.ctx.drawImage(this.sprite.image, -TILE_W/2, -TILE_H/2);
    Drawable.prototype.ctx.restore();
  };

  this.ani = function draw_animated(x, y, animation)
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
    Drawable.prototype.ctx.drawImage(this.sprite.image, sprite_coordinates[0]*32,
      sprite_coordinates[1]*32, 32, 32, x, y, 32, 32);
  };
}

//----------------------------
//------------LOADING---------
//----------------------------

const sprites = [];
let on_sprites_loaded = null;

const Sprites = function start_loading_sprites(file_paths)
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
      Sprites(file_paths);
    }else{
      console.log('Done loading sprites.');
      on_sprites_loaded();
    }
  };
}
