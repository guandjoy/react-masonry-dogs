import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import "./masonry.css";

function MasonryLayout(props) {
  const masonryLayout = useRef();
  const cardRef = useRef(); // asign on a first card for representing general styles
  // declare vars for general styles of all cards
  var cardRefWidth = 0
  var cardRefMarginTop = 0
  var cardRefMarginRight = 0
  var cardRefMarginBottom = 0
  var cardRefMarginLeft = 0
  var cardRefTotalWidth = 0

  useEffect(() => {
    // mount and unmount only
    checkLayout()
    console.log('mount')
    window.addEventListener("resize", checkLayout);
    return () => {
      console.log('unmount')
      window.removeEventListener("resize", checkLayout);
    };
  }, []);

  const [failedCount, setFailedCount] = useState(0);
  const errorHandler = index => {
    setFailedCount(failedCount + 1);
    console.log("can't load: ", index);
  };

  const [loadCount, setLoadCount] = useState(0);
  const loadHandler = (some) => {
    setLoadCount(loadCount >= props.children.length ? 1 : loadCount + 1);
  };

  const updateCardRefMeasures = () => {
    const style = window.getComputedStyle(cardRef.current)
    cardRefWidth = cardRef.current.offsetWidth
    cardRefMarginTop = Number(style.marginTop.replace(/[^0-9]/g, ""))
    cardRefMarginRight = Number(style.marginRight.replace(/[^0-9]/g, ""))
    cardRefMarginBottom = Number(style.marginBottom.replace(/[^0-9]/g, ""))
    cardRefMarginLeft = Number(style.marginLeft.replace(/[^0-9]/g, ""))
    cardRefTotalWidth = (
        cardRef.current.offsetWidth 
        + Number(style.marginRight.replace(/[^0-9]/g, "")) 
        + Number(style.marginLeft.replace(/[^0-9]/g, ""))
      )
  }

  // everytime window resize
  const [columns, setColumns] = useState(0);
  const checkLayout = (evt) => {
    updateCardRefMeasures()
    const wrapperWidth = masonryLayout.current.offsetWidth;
    const columnsNum = Math.floor(wrapperWidth / cardRefTotalWidth)
    setColumns(Math.floor(wrapperWidth / cardRefTotalWidth));
    setTransition(evt != undefined)
  };

  const [transition, setTransition] = useState(false)
  useEffect(() => {
    setTransition(false)
  }, [props.children])


  
  const [cards, setCards] = useState([]);
  // sizes of the boundring box around the whole layout
  const [boundWidth, setBoundWidth] = useState(0)
  const [boundHeight, setBoundHeight] = useState(0)
  useLayoutEffect(
    () => {
      // setTransition(window.innerWidth != windowWidth)
      var protoCards = [];
      var endline = [];
      for (let i = 0; i < columns; i++) {
        endline[i] = 0;
      }
      updateCardRefMeasures()
      React.Children.map(props.children, (child, index) => {
        let height =
          document.getElementById(child.key).offsetHeight +
          cardRefMarginTop +
          cardRefMarginBottom;
        let leastNum = Math.min(...endline);
        let leastNumIndex = endline.indexOf(leastNum);
        var posX = leastNumIndex * cardRefTotalWidth;
        var posY = endline[leastNumIndex];
        protoCards[index] = { x: posX, y: posY,};
        endline[leastNumIndex] += height;
      });
      setCards(protoCards);
      // sizes of the boundring box around the whole layout
      setBoundWidth(cardRefTotalWidth * columns)
      setBoundHeight(endline[endline.indexOf(Math.max(...endline))])
    }, [columns, loadCount, props.children]
  );

  const renderChildren = () =>
    React.Children.map(props.children, (child, index) => {
      let newComponent = (
        <div
          className="card-bounding"
          id={props.children[index].key}
          style={{
            position: "absolute",
            transform: `translate(${cards[index] ? cards[index].x : 0}px, ${
              cards[index] ? cards[index].y : 0
            }px)`,
            transition: `${transition ? 'transform 0.5s' : 'none'}`,
            visibility: cards[index] ? 'visible' : 'hidden',
          }}
          onLoad={loadHandler}
          onError={errorHandler}
          ref={index === 0 ? cardRef : null}
        >
          {child}
        </div>
      )
      return newComponent;
  
      // Modifying children via cloneElement

      // let newChild = React.cloneElement(child, {
      //   id: props.children[index].key, // should generate unique id if undefined
      //   style: {
      //     position: "absolute",
      //     transform: `translate(${cards[index] ? cards[index].x : 0}px, ${
      //       cards[index] ? cards[index].y : 0
      //     }px)`,
      //     transition: `${transition ? 'transform 0.5s' : 'none'}`,
      //     visibility: cards[index] ? 'visible' : 'hidden',
      //   }, // positioning
      //   onLoad: loadHandler,
      //   onError: errorHandler,
      //   ref: index === 0 ? cardRef : null
      // });
      // return newChild
    });
  return (
    <div className="masonry" ref={masonryLayout}>
      <div
        style={{
          width: `${boundWidth}px`,
          height: `${boundHeight}px`,
        }}
        className="boundry-box"
      >
        {renderChildren()}
        {console.log('render')}
      </div>
    </div>
  );
}

export default MasonryLayout;
