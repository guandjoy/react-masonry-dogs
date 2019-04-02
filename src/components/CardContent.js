import React, { useEffect, useState } from "react";
import styled from 'styled-components'

const randomHeight = () => Math.floor(Math.random() * 170) + 128 

const StyledDiv = styled.div`
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  background-color: #E2E2E2;
  width: ${props => props.width};
  margin: 12px;
  line-height: 0;
  
  &.loading {
    height: ${props => props.height}px;
  }

  .error {
    line-height: ${props => props.height}px;
    align-text: center;
  }

  .number {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: #E8E8E8;
    z-index: 2;
    line-height: 24px;
    border-radius: 100%;
    font-size: 12px;
    margin: 6px;
    opacity: 0.7;
  }

  .image {
    opacity: 1;
    filter: contrast(105%) saturate(140%) sepia(40%);
    width: 100%;
  }

  .image.loading {
    opacity: 0.2;
    filter: blur(8px) saturate(200%) contrast(200%);
    height: 100%;
  }
`

StyledDiv.defaultProps = {
  width: '256px',
  height: randomHeight(),
}

function CardContent(props) {
  // const imageID = Math.random().toString(36).substr(2, 9)
  const [isLoad, setIsLoad] = useState(false)
  const [isError, setIsError] = useState(false)
  const [height, setHeight] = useState(randomHeight())
  const onLoadHandler = () => setIsLoad(true)
  const onErrorHandler = () => setIsError(true)
  return (
    <StyledDiv className={!isLoad && 'loading'} height={height} >
      <div className="number">{props.number}</div>
      <div className="error">{isError ? 'failed to load' : null}</div>
      <img src={props.image} onLoad={onLoadHandler} onError={onErrorHandler} className={`image ${!isLoad && "loading"}`} />
    </StyledDiv>
  );
}

export default CardContent