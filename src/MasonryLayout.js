import React, { useEffect, useRef, useState } from "react";

import "./masonry.css";

function MasonryLayout(props) {
  // did mount only

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [failedCount, setFailedCount] = useState(0);
  const errorHandler = index => {
    setFailedCount(failedCount + 1);
    console.log("can't load: ", index);
  };
  // const [loadCount, setLoadCount] = useState(0);
  // var loadCount = 0;
  const [loadCount, setLoadCount] = useState(0);
  const loadHandler = () => {
    // console.log(loadCount + 1);
    // loadCount += 1;
    setLoadCount(loadCount + 1);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(
    () => {
      // console.log(
      //   "isLoaded: ",
      //   loadCount === React.Children.count(props.children)
      // );
      setIsLoaded(
        loadCount + failedCount === React.Children.count(props.children)
      );
    },
    [loadCount, failedCount]
  );

  // everytime window resize
  const handleResize = () => {
    const wrapperWidth = masonryLayout.current.offsetWidth;
    console.log(props.children[0].key);
    const sampleCardWidth = cardRef.current.offsetWidth;
    setColumns(Math.floor(wrapperWidth / sampleCardWidth));
  };

  // if number of columns changed after resize
  const [columns, setColumns] = useState(undefined);

  // set parameters of a card
  const [cardsSampleProps, setCardsSampleProps] = useState({
    width: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    totalWidth: 0
  });
  useEffect(
    () => {
      let cardsSample = document.getElementById(props.children[0].key);
      let cardsSampleStyles = window.getComputedStyle(cardsSample);
      cardsSampleProps.width = cardsSample.offsetWidth;
      cardsSampleProps.marginTop = Number(
        cardsSampleStyles.marginTop.replace(/[^0-9]/g, "")
      );
      cardsSampleProps.marginRight = Number(
        cardsSampleStyles.marginRight.replace(/[^0-9]/g, "")
      );
      cardsSampleProps.marginBottom = Number(
        cardsSampleStyles.marginBottom.replace(/[^0-9]/g, "")
      );
      cardsSampleProps.marginLeft = Number(
        cardsSampleStyles.marginLeft.replace(/[^0-9]/g, "")
      );
      cardsSampleProps.totalWidth =
        cardsSampleProps.width +
        cardsSampleProps.marginRight +
        cardsSampleProps.marginLeft;
      setCardsSampleProps(cardsSampleProps);
    },
    [columns]
  );

  const [cards, setCards] = useState([]);
  useEffect(
    () => {
      var protoCards = [];
      var endline = [];
      for (let i = 0; i < columns; i++) {
        endline[i] = 0;
      }
      React.Children.map(props.children, (child, index) => {
        let width = cardsSampleProps.totalWidth;
        let height =
          document.getElementById(child.key).offsetHeight +
          cardsSampleProps.marginTop +
          cardsSampleProps.marginBottom;
        let leastNum = Math.min(...endline);
        let leastNumIndex = endline.indexOf(leastNum);
        if (index == index) {
          var posX = leastNumIndex * width;
          var posY = endline[leastNumIndex];
          protoCards[index] = { x: posX, y: posY };
        }
        endline[leastNumIndex] += height;
      });
      setCards(protoCards);
    },
    [isLoaded]
  );
  const cardRef = useRef();
  const renderChildren = () =>
    React.Children.map(props.children, (child, index) => {
      let newChild = React.cloneElement(child, {
        id: props.children[index].key, // should generate unique id if undefined
        style: {
          position: "absolute",
          transform: `translate(${cards[index] ? cards[index].x : 0}px, ${
            cards[index] ? cards[index].y : 0
          }px)`
        }, // positioning
        className: "card-container", // styling
        onLoad: loadHandler,
        onError: errorHandler,
        ref: index === 0 ? cardRef : null
      });
      // if (index === 0) {
      //   console.log(newChild);
      // }
      console.log(newChild);
      return newChild;
    });
  const masonryLayout = useRef();
  return (
    <div className="masonry" ref={masonryLayout}>
      <p>{isLoaded ? "loaded" : "loading"}</p>
      <div
        style={{
          width: `${cardsSampleProps.totalWidth * columns}px`
        }}
        className="boundry-box"
      >
        {renderChildren()}
      </div>
    </div>
  );
}

export default MasonryLayout;
