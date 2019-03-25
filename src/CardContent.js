import React, { useEffect, useRef, useState } from "react";

const randomHeight = () => Math.floor(Math.random() * 170) + 128

function CardContent(props) {
  const cardRef = useRef();
  const [isLoad, setIsLoad] = useState(false)
  const [isError, setIsError] = useState(false)
  const height = randomHeight()
  useEffect(() => {

  })
  return (
    <div ref={cardRef} className="card" style={{
    	overflow: 'hidden',
    	height: isLoad ? null : height,
    	borderRadius: '4px',
    	boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    	backgroundColor: '#E2E2E2'
    }} >
    {isLoad ? null : <div style={{position: 'absolute', width: '256px', height: '100%', }}>{isError ? 'failed to load' : null}</div>}
    <img src={props.image} onLoad={() => setIsLoad(true)} onError={() => setIsError(true)} style={{
    	opacity: isLoad ? '1' : '0.2',
    	filter: isLoad ? 'contrast(105%) saturate(140%)' : 'blur(8px) saturate(200%) contrast(200%)',
    	width: '100%',
    	minHeight: isLoad ? null : height,
    	minWidth: isLoad ? null : height,

    }}/>
      
    </div>
  );
}

export default CardContent;
