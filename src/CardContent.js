import React, { useEffect, useRef, useState } from "react";

const randomHeight = () => Math.floor(Math.random() * 256) + 150

function CardContent(props) {
  const cardRef = useRef();
  const [isLoad, setIsLoad] = useState(false)
  const height = randomHeight()
  useEffect(() => {

  })
  return (
    <div ref={cardRef} className="card" style={{
    	
    	minHeight: isLoad ? null : height
    }} >
    {isLoad ? null : <div style={{position: 'absolute', width: '256px', height: '100%', }}>loading</div>}
    <img src={props.image} onLoad={() => setIsLoad(true)} style={{
    	opacity: isLoad ? '1' : '0.1',
    	width: '100%',
    	height: isLoad ? null : height
    }}/>
      
    </div>
  );
}

export default CardContent;
