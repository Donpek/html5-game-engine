var Context = function(canvas_id, context_type) //context_type = '2d', '3d'
{
  this.canvas = document.getElementById(canvas_id);
  this.ctx = this.canvas.getContext(context_type);
}
