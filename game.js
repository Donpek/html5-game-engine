on_sprites_loaded = () => {
  const pokemon_npc = new Drawable(sprites[3]);
  const pokemon_player = new Drawable(sprites[3]);

  tiles = {
    static: [
      new Tile(sprites[0], false), //orange
      new Tile(sprites[1], false), //red
    ],
    animated: [
      new Tile(sprites[2], true, waterAni), //water
    ],
  };

  current_map = new Map(Game.widthInTiles, Game.heightInTiles);
  current_map.addLayer(tiles.static[0]);

  Drawable.prototype.ctx = Pallette.ctx;
  for(let i=0;i<tiles.static.length;i++) tiles.static[i].tile.whole(i*TILE_W, 0);
  for(let i=0;i<tiles.animated.length;i++) tiles.animated[i].tile.sheet(i*TILE_W, TILE_H, 0);

  Drawable.prototype.ctx = Game.ctx;
  setInterval( () => {

    current_map.draw();

    /**/
    direction = dx = dy = 0;

    if(Keys.up) {dy = -moveSpeed; direction |= DIR_N;}
    if(Keys.right) {dx = moveSpeed; direction |= DIR_E;}
    if(Keys.down) {dy = moveSpeed; direction |= DIR_S;}
    if(Keys.left) {dx = -moveSpeed; direction |= DIR_W;}

    //if(px > 0 && py > 0 && px < Game.width && py < Game.height){
    let zx = px + dx, zy = py + dy;
      if(
        !coll(zx, zy) &&
        !coll(zx + TILE_W, zy) &&
        !coll(zx, zy + TILE_H) &&
        !coll(zx + TILE_W, zy + TILE_H)
      ){
        px += dx;
        py += dy;
      }

      /*if(!coll(px, py + dy)){
        py += dy;
      }*/
    //}

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
