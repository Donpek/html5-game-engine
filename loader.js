/*DEPENDENCIES
*   sprite.js
*/

/*PURPOSE
*   provides method that loads an array of images and,
*     once all of them have been loaded, calls a
*     callback function.
*/

var spritesheets = [];
var spritesheets_loaded_callback = null;

function loadSpritesheets(file_path_array)
{
  var spritesheet = new Spritesheet(file_path_array[0]);
  spritesheets.push(spritesheet);
  file_path_array.shift();
  spritesheet.image.onload = function()
  {
    if(file_path_array.length > 0)
    {
      loadSpritesheets(file_path_array);
    }else{
      console.log('Done loading spritesheets.');
      spritesheets_loaded_callback();
    }
  };
}
