function drawMap()
{
  map_index = 0;
  for(var y=0;y<10;y++)
    for(var x=0;x<10;x++,map_index++)
      sprites[map[map_index]].draw(x*TILE_W, y*TILE_H);
}
