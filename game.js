on_sprites_loaded = () => {
  const poke_coll = new RectCollider(0.25,0.25,0.5,0.5);
  const poke_player = new Entity({
    x: 32, y: 32,
    move_speed: 2,
    sprite: sprites[3],
    type: 'player',
    ani: green_poke_SE,
    coll: poke_coll
  });

  tiles = {
    static: [
      new Entity({
        sprite: sprites[0],
        type: null
      }), //orange
      new Entity({
        sprite: sprites[1],
        type: null
      }), //red
    ],
    animated: [
      new Entity({
        sprite: sprites[2],
        type: 'solid',
        ani: water_ani,
      }), //water
    ],
  };



  current_map = new Map(Game.widthInTiles, Game.heightInTiles);
  current_map.addLayer(tiles.animated[0]);

  Drawable.prototype.ctx = Pallette.ctx;
  for(let i=0;i<tiles.static.length;i++) tiles.static[i].draw.whole(i*TILE_W, 0);
  for(let i=0;i<tiles.animated.length;i++) tiles.animated[i].draw.sheet(i*TILE_W, TILE_H, 0);

  Drawable.prototype.ctx = Game.ctx;
  setInterval( () => {
    current_map.draw();

    poke_player.dir = poke_player.dx = poke_player.dy = 0;
    if(Keys.up) {
      poke_player.dy = -poke_player.move_speed; poke_player.dir |= DIR_N;
    }
    if(Keys.right) {
      poke_player.dx = poke_player.move_speed; poke_player.dir |= DIR_E;
    }
    if(Keys.down) {
      poke_player.dy = poke_player.move_speed; poke_player.dir |= DIR_S;
    }
    if(Keys.left) {
      poke_player.dx = -poke_player.move_speed; poke_player.dir |= DIR_W;
    }

    if(
      coll(poke_player, 'nw') === null &&
      coll(poke_player, 'ne') === null &&
      coll(poke_player, 'sw') === null &&
      coll(poke_player, 'se') === null
    ){
      poke_player.x += poke_player.dx;
      poke_player.y += poke_player.dy;
    }

    if(poke_player.dir & DIR_N) poke_player.ani = green_poke_N;
    if(poke_player.dir & DIR_E) poke_player.ani = green_poke_E;
    if(poke_player.dir & DIR_S) poke_player.ani = green_poke_S;
    if(poke_player.dir & DIR_W) poke_player.ani = green_poke_W;
    if(poke_player.dir & DIR_N && poke_player.dir & DIR_E) poke_player.ani = green_poke_NE;
    if(poke_player.dir & DIR_N && poke_player.dir & DIR_W) poke_player.ani = green_poke_NW;
    if(poke_player.dir & DIR_S && poke_player.dir & DIR_E) poke_player.ani = green_poke_SE;
    if(poke_player.dir & DIR_S && poke_player.dir & DIR_W) poke_player.ani = green_poke_SW;

    pokemonStill = poke_player.ani.sequence[0].spriteID;

    if(poke_player.dir === 0){
      poke_player.draw.sheet(poke_player.x,poke_player.y,pokemonStill);
    }else {
      poke_player.draw.ani(poke_player.x,poke_player.y,poke_player.ani);
    }
  },FPS);
};
