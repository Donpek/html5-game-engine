let selected = {
  x: -1, y: -1,
};

const Mouse = function start_tracking_mouse_input()
{
  /*map editor*/
  const pallette_offset = $('#pallette').offset();
  $('#pallette').on('click', (e) => {
    selected.x = Math.floor( (e.pageX - pallette_offset.left) / TILE_W);
    selected.y = Math.floor( (e.pageY - pallette_offset.top) / TILE_H);
  });
  /**/

  const game_offset = $('#game').offset();
  $('#game').on('click', (e) => {
    /*map editor*/
    if($('#editor_on').prop('checked')){
      const x = Math.floor( (e.pageX - game_offset.left) / TILE_W);
      const y = Math.floor( (e.pageY - game_offset.top) / TILE_H);
      map[xy2i(x,y,Game.width/TILE_W)] = selected.y*tiles[0].length + selected.x;
    }
    /**/
  });
}
