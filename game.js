on_sprites_loaded = () => {
  const pokemon_npc = new Drawable(sprites[3]);
  const pokemon_player = new Drawable(sprites[3]);
  const tile_orange = new Drawable(sprites[0]);
  const tile_red = new Drawable(sprites[1]);
  const water = new Drawable(sprites[2]);

  const static_tiles = [tile_orange, tile_red];
  const animated_tiles = [water];

  setInterval( () => {
    /*Map.*/
    map_index = 0;
    for(let y=0;y<10;y++)
      for(let x=0;x<10;x++,map_index++)
      {
        if(map[map_index] < static_tiles.length)
        {
          static_tiles[map[map_index]].whole(x*TILE_W, y*TILE_H);
        }else{
          animated_tiles[map[map_index] - static_tiles.length].
            ani(x*TILE_W, y*TILE_H, waterAni);
        }
      }
    /**/

    /*Player controls*/
    direction = 0;
    if(Keys.up) {py -= moveSpeed; direction |= DIR_N;}
    if(Keys.right) {px += moveSpeed; direction |= DIR_E;}
    if(Keys.down) {py += moveSpeed; direction |= DIR_S;}
    if(Keys.left) {px -= moveSpeed; direction |= DIR_W;}
    /**/

    /*Animation*/
    if(direction & DIR_N) pokemonAni = green_poke_N;
    if(direction & DIR_E) pokemonAni = green_poke_E;
    if(direction & DIR_S) pokemonAni = green_poke_S;
    if(direction & DIR_W) pokemonAni = green_poke_W;
    if(direction & DIR_N && direction & DIR_E) pokemonAni = green_poke_NE;
    if(direction & DIR_N && direction & DIR_W) pokemonAni = green_poke_NW;
    if(direction & DIR_S && direction & DIR_E) pokemonAni = green_poke_SE;
    if(direction & DIR_S && direction & DIR_W) pokemonAni = green_poke_SW;

    pokemonStill = pokemonAni.sequence[0].spriteID;

    if(direction === 0){
      pokemon_player.sheet(px,py,pokemonStill);
    }else {
      pokemon_player.ani(px,py,pokemonAni);
    }
    pokemon_npc.sheet(224,160,15);
    /**/
  },FPS);
};
