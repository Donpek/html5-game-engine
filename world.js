function drawMap()
{
  sprites[0].draw(0,0);
  sprites[1].draw(32,0);

  map_index = 0;
  for(var y=0;y<10;y++)
    for(var x=0;x<10;x++,map_index++)
      sprites[map[map_index]].draw(50 + x*TILE_W, 50 + y*TILE_H);
}
