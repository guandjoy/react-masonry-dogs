import React, { useEffect, useRef } from "react";

function CardContent(props) {
  const cardRef = useRef();
  return (
    <div ref={cardRef}>
      <img src={props.image} width="100%" />
    </div>
  );
}

export default CardContent;
