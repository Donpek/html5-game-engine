const TO_RADIANS = Math.PI / 180;

const rand = function random_integer_from_range(min, max) // [min; max)
{
  return min + Math.floor(Math.random() * max);
}

const xy2i = function coordinates_to_index(x, y, map_width)
{
  return y * map_width + x;
}

const i2xy = function index_to_coordinates(i, map_width)
{
  return [ (i % map_width), (Math.floor(i / map_width)) ];
}
