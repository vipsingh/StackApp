import React from 'react';
const img_style ={
    backgroundImage: 'url()'
}
const ObjectImage = (props)=>{
    let styl = Object.assign(img_style, props.style),
        size = props.size;
    styl.backgroundImage = `url(${window.__Config.file_api_url}/image/object/fallback?size=${size})`;
    let src = `${window.__Config.file_api_url}/image/object/${props.name}/${props.id}?size=${size}`;
    return(
        <img src={src} style={styl} />
    )
}
export default ObjectImage;