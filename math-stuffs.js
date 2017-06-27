var TO_RADIANS = Math.PI / 180;

function RandomInt(min, max) // [min; max)
{
  return min + Math.floor(Math.random() * max);
}

function xy2i(x, y, map_width)
{
  return y * map_width + x;
}

function i2xy(i, map_width)
{
  return [ (i % map_width), (Math.floor(i / map_width)) ];
}
