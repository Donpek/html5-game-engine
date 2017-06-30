const Entity = function entity_constructor(args){
  if(args instanceof Entity){
    this.draw = new Drawable(args.draw.sprite);
  }else{
    this.draw = new Drawable(args.sprite);
  }
  this.x = args.x;
  this.y = args.y;
  this.move_speed = args.move_speed;
  this.type = args.type;
  this.ani = args.ani;
  this.coll = args.coll;
  this.gravity = args.gravity;
}

const Map = function map_constructor(width, height){
  this.width = width;
  this.height = height;

  this.layers = [];

  this.addLayer = function map_add_layer(default_tile){
    const layer = [];
    for(let i=0,l=width*height;i<l;i++) layer.push(new Entity(default_tile));
    this.layers.push(layer);
  }

  this.draw = function draw_map_layer_by_layer(){
    let tile_index = 0;
    for(let y=0;y<this.height;y++){
      for(let x=0;x<this.width;x++, tile_index++){
        for(let l=0;l<this.layers.length;l++){
          const current = this.layers[l][tile_index];
          if(current.ani === undefined){
            current.draw.whole(x*TILE_W, y*TILE_H);
          }else{
            current.draw.ani(x*TILE_W, y*TILE_H, current.ani);
          }
        }
      }
    }
  }
}
