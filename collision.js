const coll = function point_vs_tile_collision(point_x, point_y) {
  const point = px2tiles(point_x, point_y);
  const tile = current_map.layers[0][xy2i(point.x,point.y,Game.width/TILE_W)];

  return tile.solid;
}
