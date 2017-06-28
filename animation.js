const Animation = function(frame_sequence, frame_delay_sequence)
{
  if(frame_sequence.length != frame_delay_sequence.length)
    console.log('Both sequences have to be of the same length.');

  this.sequence = [];
  for(let i=0;i<frame_sequence.length;i++)
    this.sequence.push({
      spriteID: frame_sequence[i],
      delay: frame_delay_sequence[i]
    });
}
