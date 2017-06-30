let selected;

const Mouse = function start_tracking_mouse_input()
{
  /*map editor*/
  const pallette_offset = $('#pallette').offset();
  $('#pallette').on('click', (e) => {
    selected = px2tiles(
      e.pageX - pallette_offset.left,
      e.pageY - pallette_offset.top
    );
  });
  /**/

  const game_offset = $('#game').offset();
  $('#game').on('click', (e) => {
    /*map editor*/
    if($('#editor_on').prop('checked')){
      const coords = px2tiles(
        e.pageX - game_offset.left,
        e.pageY - game_offset.top
      );
      const index = xy2i(coords.x,coords.y,Game.width/TILE_W);
      console.log(index);
      if(selected.y === 0){ //STATIC TILES
        current_map.layers[0][index] = new Entity(tiles.static[selected.x]);
      }else{
        current_map.layers[0][index] = new Entity(tiles.animated[selected.x]);
      }
    }
    /**/
  });
}
