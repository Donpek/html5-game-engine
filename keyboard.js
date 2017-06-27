var Keyboard =
{
  left: false,
  up: false,
  right: false,
  down: false,

  a: false,
  w: false,
  d: false,
  s: false,

  shift: false
};

function startTrackingKeyboardInput()
{
  $(document).on('keydown', function(e){
    switch(e.keyCode){
      case 37: Keyboard.left = true; break;
      case 38: Keyboard.up = true; break;
      case 39: Keyboard.right = true; break;
      case 40: Keyboard.down = true; break;
      case 65: Keyboard.a = true; break;
      case 87: Keyboard.w = true; break;
      case 68: Keyboard.d = true; break;
      case 83: Keyboard.s = true; break;
      case 16: Keyboard.shift = true; break;
      default: console.log('KeyCode not recognized.');
    }
  });

  $(document).on('keyup', function(e){
    switch(e.keyCode){
      case 37: Keyboard.left = false; break;
      case 38: Keyboard.up = false; break;
      case 39: Keyboard.right = false; break;
      case 40: Keyboard.down = false; break;
      case 65: Keyboard.a = false; break;
      case 87: Keyboard.w = false; break;
      case 68: Keyboard.d = false; break;
      case 83: Keyboard.s = false; break;
      case 16: Keyboard.shift = false; break;
      default: console.log('KeyCode not recognized.');
    }
  });
}
