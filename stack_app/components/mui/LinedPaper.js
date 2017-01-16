const lined_paper ={
  backgroundColor: 'white',
  backgroundImage: '-webkit-linear-gradient(#f6abca 1px, transparent 1px), -webkit-linear-gradient(#f6abca 1px, transparent 1px), -webkit-linear- gradient(#e8e8e8 1px, transparent 1px)',
  backgroundImage: '-moz-linear-gradient(#f6abca 1px, transparent 1px), -moz-linear-gradient(#f6abca 1px, transparent 1px), -moz-linear-gradient #e8e8e8 1px, transparent 1px',
  backgroundImage: '-o-linear-gradient(#f6abca 1px, transparent 1px), -o-linear-gradient(#f6abca 1px, transparent 1px), -o-linear-gradient(#e8e8e8 1px, transparent 1px)',
  backgroundImage: 'linear-gradient(#f6abca 1px, transparent 1px), linear-gradient(#f6abca 1px, transparent 1px), linear-gradient(#e8e8e8 1px, transparent 1px)',
  backgroundSize: '1px 1px, 1px 1px, 30px 30px',
  backgroundRepeat: 'repeat-y, repeat-y, repeat',
  backgroundPosition: '62px 0, 66px 0, 0 -1px',
  position: 'relative',
  padding: '30px 15px 30px 75px',
  lineHeight: '30px',
  fontStyle: 'italic'
}
const ul_style= {position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9,
    listStyle: 'none',
    padding: 0,
    margin: 0,
    height: '100%'};

/*
<Paper>
  <div style={{position: 'relative', padding: 0, boxSizing: 'border-box', marginRight: 10}}>
    <ul style={ul_style}>
      <li style={{display:'inline-block', float: 'left'}}><a style={{lineHeight:'28px', minWidth: 28}}><i className='fa fa-times'></i></a></li>
    </ul>
  </div>
  <div style={lined_paper}>
    <span>hello</span><br/>
    <span>hello</span>
  </div>
</Paper>
*/
