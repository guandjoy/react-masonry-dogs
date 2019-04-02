import React, { useEffect, useRef, useState, useLayoutEffect } from "react";


var elementRefWidth = 0
var elementRefMarginTop = 0
var elementRefMarginRight = 0
var elementRefMarginBottom = 0
var elementRefMarginLeft = 0
var elementRefTotalWidth = 0

function MasonryLayout(props) {
  const masonryLayout = useRef();
  const elementRef = useRef(); // asign on a first element for representing general styles
  // declare vars for general styles of all elements
  const checkLayout = (evt) => {
    updateCardRefMeasures()
    const wrapperWidth = masonryLayout.current.offsetWidth;
    const columnsNum = Math.floor(wrapperWidth / elementRefTotalWidth)
    setColumns(Math.floor(wrapperWidth / elementRefTotalWidth));
    setTransition(evt != undefined)
  };
  useEffect(() => {
    // mount and unmount only
    checkLayout()
    window.addEventListener("resize", checkLayout);
    return () => {
      window.removeEventListener("resize", checkLayout);
    };
  }, []);

  const [failedCount, setFailedCount] = useState(0);
  const errorHandler = index => {
    setFailedCount(failedCount + 1);
    console.log("can't load: ", index);
  };

  const [loadCount, setLoadCount] = useState(0);
  const loadHandler = index => {
    setLoadCount(loadCount + 1);
  };

  const updateCardRefMeasures = () => {
    const style = window.getComputedStyle(elementRef.current)
    elementRefWidth = elementRef.current.offsetWidth
    elementRefMarginTop = Number(style.marginTop.replace(/[^0-9]/g, ""))
    elementRefMarginRight = Number(style.marginRight.replace(/[^0-9]/g, ""))
    elementRefMarginBottom = Number(style.marginBottom.replace(/[^0-9]/g, ""))
    elementRefMarginLeft = Number(style.marginLeft.replace(/[^0-9]/g, ""))
    elementRefTotalWidth = (
        elementRef.current.offsetWidth 
        + Number(style.marginRight.replace(/[^0-9]/g, "")) 
        + Number(style.marginLeft.replace(/[^0-9]/g, ""))
      )
  }

  // everytime window resize
  const [columns, setColumns] = useState(0);


  const [transition, setTransition] = useState(false)
  useEffect(() => {
    setTransition(false)
  }, [props.children])


  

  const [layout, setLayout] = useState({
    elements: [],
    width: 0,
    height: 0
  })
  useLayoutEffect(
    () => {
      var protoElements = [];
      var endline = [];
      for (let i = 0; i < columns; i++) {
        endline[i] = 0;
      }
      updateCardRefMeasures()
      React.Children.map(props.children, (child, index) => {
        let height =
          document.getElementById(child.key).offsetHeight +
          elementRefMarginTop +
          elementRefMarginBottom;
        let leastNum = Math.min(...endline);
        let leastNumIndex = endline.indexOf(leastNum);
        var posX = leastNumIndex * elementRefTotalWidth;
        var posY = endline[leastNumIndex];
        protoElements[index] = { x: posX, y: posY,};
        endline[leastNumIndex] += height;
      });
      setLayout({
        elements: protoElements, // list of all elements with coorditares
        width: elementRefTotalWidth * columns, // width of the whole layout
        height: endline[endline.indexOf(Math.max(...endline))] // height of the whole layout 
      })
    }, [columns, loadCount, props.children]
  );

  const renderChildren = () =>
    React.Children.map(props.children, (child, index) => {
      let newComponent = (
        <div
          className="element-bounding"
          id={child.key}
          style={{
            position: "absolute",
            transform: `translate(${layout.elements[index] ? layout.elements[index].x : 0}px, ${
              layout.elements[index] ? layout.elements[index].y : 0
            }px)`,
            transition: `${transition ? 'transform 0.4s' : 'none'}`,
            visibility: layout.elements[index] ? 'visible' : 'hidden',
          }}
          onLoad={loadHandler}
          onError={errorHandler}
          ref={index === 0 ? elementRef : null}
        >
          {child}
        </div>
      )
      return newComponent;
    });
  return (
    <div className="masonry" ref={masonryLayout}>
      <div
        style={{
          width: `${layout.width}px`,
          height: `${layout.height}px`,
          margin: 'auto',
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
