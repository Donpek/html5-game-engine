/*DEPENDENCIES
*   sprite.js
*/

/*PURPOSE
*   provides method that loads an array of images and,
*     once all of them have been loaded, calls a
*     callback function.  
*/

var sprites = [];
var sprites_loaded_callback = null;

function loadSprites(file_path_array)
{
  var sprite = new Sprite(file_path_array[0]);
  sprites.push(sprite);
  file_path_array.shift();
  sprite.image.onload = function()
  {
    if(file_path_array.length > 0)
    {
      loadSprites(file_path_array);
    }else{
      console.log('Done loading sprites.');
      sprites_loaded_callback();
    }
  };
}
