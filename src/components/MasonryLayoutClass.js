import React from 'react'

class MasonryLayoutClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onErrorCount: 0,
      onLoadCount: 0,
      columns: 0,
      transition: false,
      layout: {
        elements: [],
        width: 0,
        height: 0,
      },
    }
    this.elementRefMeasures = {}
    // Refs
    this.masonryLayout = React.createRef()
    this.elementRef = React.createRef()
    // Mount methods
    this.checkLayout = this.checkLayout.bind(this)
    this.renderChildren = this.renderChildren.bind(this)
    this.updateCardRefMeasures = this.updateCardRefMeasures.bind(this)
    this.loadHandler = this.loadHandler.bind(this)
    this.errorHandler = this.errorHandler.bind(this)
  }

  componentDidMount() {
    this.checkLayout()
    window.addEventListener("resize", this.checkLayout);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.columns !== this.state.columns 
      || prevState.onLoadCount !== this.state.onLoadCount
    ) {
      var protoElements = [];
      var endline = [];
      for (let i = 0; i < this.state.columns; i++) {
        endline[i] = 0;
      }
      this.updateCardRefMeasures()
      React.Children.map(this.props.children, (child, index) => {
        let height =
          document.getElementById(child.key).offsetHeight +
          this.elementRefMeasures.marginTop +
          this.elementRefMeasures.marginBottom;
        let leastNum = Math.min(...endline);
        let leastNumIndex = endline.indexOf(leastNum);
        var posX = leastNumIndex * this.elementRefMeasures.totalWidth;
        var posY = endline[leastNumIndex];
        protoElements[index] = { x: posX, y: posY,};
        endline[leastNumIndex] += height;
      });
      this.setState({
        layout: {
          elements: protoElements, // list of all elements with coorditares
          width: this.elementRefMeasures.totalWidth * this.state.columns, // width of the whole layout
          height: endline[endline.indexOf(Math.max(...endline))] // height of the whole layout               
        }
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkLayout);
  }

  errorHandler(index) {
    this.setState({onErrorCount: this.state.onErrorCount + 1})
    console.log("can't load: ", index)
  }

  loadHandler() {
    this.setState({ onLoadCount: this.state.onLoadCount + 1 })
  }

  updateCardRefMeasures() {
    const style = window.getComputedStyle(this.elementRef.current)
    this.elementRefMeasures = {
      width: this.elementRef.current.offsetWidth,
      marginTop: Number(style.marginTop.replace(/[^0-9]/g, "")),
      marginRight: Number(style.marginRight.replace(/[^0-9]/g, "")),
      marginBottom: Number(style.marginBottom.replace(/[^0-9]/g, "")),
      marginLeft: Number(style.marginLeft.replace(/[^0-9]/g, "")),
      totalWidth: (
        this.elementRef.current.offsetWidth 
        + Number(style.marginRight.replace(/[^0-9]/g, "")) 
        + Number(style.marginLeft.replace(/[^0-9]/g, ""))
      ),
    }
  }

  checkLayout(evt) {
    this.updateCardRefMeasures()
    const wrapperWidth = this.masonryLayout.current.offsetWidth;
    const columnsNum = Math.floor(wrapperWidth / this.elementRefMeasures.totalWidth) 
    this.setState({ 
      columns: columnsNum,
      transition: evt !== undefined
    })
  }


  renderChildren() {
    return (
      React.Children.map(this.props.children, (child, index) => {
        let newComponent = (
          <div
            className="element-bounding"
            id={child.key}
            style={{
              position: "absolute",
              transform: `translate(${this.state.layout.elements[index] ? this.state.layout.elements[index].x : 0}px, ${
                this.state.layout.elements[index] ? this.state.layout.elements[index].y : 0
              }px)`,
              transition: `${this.state.transition ? 'transform 0.4s' : 'none'}`,
              visibility: this.state.layout.elements[index] ? 'visible' : 'hidden',
            }}
            onLoad={this.loadHandler}
            onError={this.errorHandler}
            ref={index === 0 ? this.elementRef : null}
          >
            {child}
          </div>
        )
        return newComponent
      }))
  }

  render() {
    return (
      <div className="masonry" ref={this.masonryLayout}>
        <div
          style={{
            width: `${this.state.layout.width}px`,
            height: `${this.state.layout.height}px`,
            margin: 'auto',
          }}
          className="boundry-box"
        >
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

export default MasonryLayoutClass