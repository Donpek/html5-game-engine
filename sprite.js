var Sprite = function(file_path, is_pattern)
{
  this.image = null;
  this.pattern = null;

  //Valid file path?
  if(file_path != null && file_path != undefined && file_path != "")
  {
    this.image = new Image();
    this.image.src = file_path;

    if(is_pattern)
    {
      //this.pattern = Context.ctx.createPattern(this.image, 'repeat');
      //Can't figure out how to make it work :/
      console.log(this.pattern);
    }
  }else{
    console.log('Failed to find file_path while constructing a Sprite object');
  }

  this.draw = function(x, y, w, h)
  {
    //Patern?
     //console.log(this.pattern );

    if(this.pattern != null)
    {
      Context.ctx.fillStyle = this.pattern;
      Context.ctx.fillRect(x, y, w, h);
    }else{
      //Single image
      //To stretch or not to stretch?
      if(w == undefined || h == undefined)
      {
        Context.ctx.drawImage(this.image, x, y, this.image.width, this.image.height);
      }else{
        Context.ctx.drawImage(this.image, x, y, w, h);
      }
    }
  };

  this.rotate = function(x, y, angle)
  {
    Context.ctx.save();
    Context.ctx.translate(1.5 * x, 1.5 * y);
    Context.ctx.rotate(angle * TO_RADIANS);
    Context.ctx.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));
    Context.ctx.restore();
  };
}
