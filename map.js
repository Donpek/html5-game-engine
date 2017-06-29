const Tile = function tile_constructor(args){
  if(args instanceof Tile){
    this.tile = new Drawable(args.tile.sprite);
    this.solid = args.solid;
    this.ani = args.ani;
  }else{
    this.tile = new Drawable(args);
    this.solid = arguments[1];
    this.ani = arguments[2];
  }
}

const Map = function map_constructor(width, height){
  this.width = width;
  this.height = height;

  this.layers = [];

  this.addLayer = function map_add_layer(default_tile){
    const layer = [];
    for(let i=0,l=width*height;i<l;i++) layer.push(new Tile(default_tile));
    this.layers.push(layer);
  }

  this.draw = function draw_map_layer_by_layer(){
    let tile_index = 0;
    for(let y=0;y<this.height;y++){
      for(let x=0;x<this.width;x++, tile_index++){
        for(let l=0;l<this.layers.length;l++){
          const current = this.layers[l][tile_index];
          if(current.ani === undefined){
            current.tile.whole(x*TILE_W, y*TILE_H);
          }else{
            current.tile.ani(x*TILE_W, y*TILE_H, current.ani);
          }
        }
      }
    }
  }
}
