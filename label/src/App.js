import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { render } from "@testing-library/react";

class ApiExample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    data:''  
    }
  }
  callApi = () =>  {
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then(res => res.json())
    .then(json => {
      this.setState({
        data: json.title
      });
    });
  }
    componentDidMount() {
      this.callApi();

    }
    render() {
      return(
        <h3>
          {this.state.data? this.state.data : '데이터를 불러오는 중입니다.'}
        </h3>
      );
    }
  }
  /*ReactDOM.render(<ApiExample/>, document.getElementById('root'));*/

  export default function App() {
  const [isDown, setIsDown] = useState(false);
  const [curDir, setCurDir] = useState("");
  const [prevDivInfo, setPrevDivInfo] = useState({
    x: null,
    y: null,
    width: null,
    height: null,
    left: null,
    top: null
  });
  const divRef = useRef(null);

  useEffect(() => {
    console.log(isDown);
    if (isDown) {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMove);
    } else {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onmousemove);
    }
  }, [isDown]);

  let prevX = 0;
  let prevY = 0;

  const onMouseDownAnchor = (e) => {
    e.preventDefault();
    const dir = e.target.dataset.dir;

    const left = Number(
      window.getComputedStyle(divRef.current).left.replace("px", "")
    );
    const top = Number(
      window.getComputedStyle(divRef.current).top.replace("px", "")
    );
    const width = Number(
      window.getComputedStyle(divRef.current).width.replace("px", "")
    );
    const height = Number(
      window.getComputedStyle(divRef.current).height.replace("px", "")
    );

    const { divClientX, divClientY } = getClientPos(dir, width, height);

    setPrevDivInfo({ x: divClientX, y: divClientY, width, height, top, left });
    setCurDir(dir);
    setIsDown(true);
  };

  const getClientPos = (dir, width, height) => {
    const clientRect = divRef.current.getBoundingClientRect();
    let divClientX = Math.floor(clientRect.left);
    let divClientY = Math.floor(clientRect.top);
    switch (dir) {
      case "lt":
        break;
      case "rt":
        divClientX = divClientX + width;
        break;
      case "lb":
        divClientY = divClientY + height;
        break;
      case "rb":
        divClientX = divClientX + width;
        divClientY = divClientY + height;
        break;
      default:
        break;
    }
    return { divClientX, divClientY };
  };
  const onMouseUp = useCallback((e) => {
    e.preventDefault();
    setIsDown(false);
  }, []);

  const onMove = useCallback(
    (e) => {
      const x = Number(e.clientX);
      const y = Number(e.clientY);
      labelMove(x, y);
    },
    [curDir]
  );

  const labelMove = (x, y) => {
    let isLeft = x < prevDivInfo.x ? true : false;
    let isTop = y > prevDivInfo.y ? true : false;
    let distanceX = Math.abs(prevDivInfo.x - x);
    let distanceY = Math.abs(prevDivInfo.y - y);

    leftMove(isLeft, distanceX);
    topMove(isTop, distanceY);

    // if (distanceX < 15 && distanceY < 15) {
    //   return;
    // }
    //범위를 벗어남
    // if (
    //   (y < prevDivInfo.y - 12.5 || y > prevDivInfo.y + 12.5 ) &&
    //   (x < prevDivInfo.x - 12.5 ||
    //   x > prevDivInfo.x + 12.5)
    // ) {
    //   console.log("대각");
    // }

    // switch (curDir) {
    //   case "lt":
    //     if (isLeft) {
    //       divRef.current.style.left = `${prevDivInfo.left - distanceX}px`;
    //       divRef.current.style.width = `${prevDivInfo.width + distanceX}px`;
    //     } else {
    //       divRef.current.style.left = `${prevDivInfo.left + distanceX}px`;
    //       divRef.current.style.width = `${prevDivInfo.width - distanceX}px`;
    //     }

    //     if (isTop) {
    //       divRef.current.style.top = `${prevDivInfo.top + distanceY}px`;
    //       divRef.current.style.height = `${prevDivInfo.height - distanceY}px`;
    //     } else {
    //       divRef.current.style.top = `${prevDivInfo.top - distanceY}px`;
    //       divRef.current.style.height = `${prevDivInfo.height + distanceY}px`;
    //     }
    //     break;
    //   case "rt":
    //     if (isLeft) {
    //       divRef.current.style.width = `${prevDivInfo.width - distanceX}px`;
    //     } else {
    //       divRef.current.style.width = `${prevDivInfo.width + distanceX}px`;
    //     }

    //     if (isTop) {
    //       divRef.current.style.top = `${prevDivInfo.top + distanceY}px`;
    //       divRef.current.style.height = `${prevDivInfo.height - distanceY}px`;
    //     } else {
    //       divRef.current.style.top = `${prevDivInfo.top - distanceY}px`;
    //       divRef.current.style.height = `${prevDivInfo.height + distanceY}px`;
    //     }
    //     break;
    //   case "lb":
    //     if (isLeft) {
    //       divRef.current.style.left = `${prevDivInfo.left - distanceX}px`;
    //       divRef.current.style.width = `${prevDivInfo.width + distanceX}px`;
    //     } else {
    //       divRef.current.style.left = `${prevDivInfo.left + distanceX}px`;
    //       divRef.current.style.width = `${prevDivInfo.width - distanceX}px`;
    //     }

    //     if (isTop) {
    //       divRef.current.style.height = `${prevDivInfo.height - distanceY}px`;
    //     } else {
    //       divRef.current.style.height = `${prevDivInfo.height + distanceY}px`;
    //     }
    //     break;
    //   case "rb":
    //     if (isLeft) {
    //       divRef.current.style.width = `${prevDivInfo.width - distanceX}px`;
    //     } else {
    //       divRef.current.style.width = `${prevDivInfo.width + distanceX}px`;
    //     }
    //     if (isTop) {
    //       divRef.current.style.height = `${prevDivInfo.height - distanceY}px`;
    //     } else {
    //       divRef.current.style.height = `${prevDivInfo.height + distanceY}px`;
    //     }
    //     break;
    //   default:
    //     break;
    // }
  };

  const leftMove = (isLeft, disX) => {
    if (curDir === "lt" || curDir === "lb") {
      if (isLeft) {
        divRef.current.style.left = `${prevDivInfo.left - disX}px`;
        divRef.current.style.width = `${prevDivInfo.width + disX}px`;
      } else {
        divRef.current.style.left = `${prevDivInfo.left + disX}px`;
        divRef.current.style.width = `${prevDivInfo.width - disX}px`;
      }
    } else if (curDir === "rt" || curDir === "rb") {
      if (isLeft) {
        divRef.current.style.width = `${prevDivInfo.width - disX}px`;
      } else {
        divRef.current.style.width = `${prevDivInfo.width + disX}px`;
      }
    }
  };

  const topMove = (isTop, disY) => {
    if (curDir === "lt" || curDir === "rt") {
      if (isTop) {
        divRef.current.style.top = `${prevDivInfo.top + disY}px`;
        divRef.current.style.height = `${prevDivInfo.height - disY}px`;
      } else {
        divRef.current.style.top = `${prevDivInfo.top - disY}px`;
        divRef.current.style.height = `${prevDivInfo.height + disY}px`;
      }
    } else if (curDir === "lb" || curDir === "rb") {
      if (isTop) {
        divRef.current.style.height = `${prevDivInfo.height + disY}px`;
      } else {
        divRef.current.style.height = `${prevDivInfo.height - disY}px`;
      }
    }
  };

  return (
    <div className="App">
      <div className="label-wrap" ref={divRef}>
        <a className="anchor" data-dir="lt" onMouseDown={onMouseDownAnchor}></a>
        <a className="anchor" data-dir="rt" onMouseDown={onMouseDownAnchor}></a>
        <a className="anchor" data-dir="lb" onMouseDown={onMouseDownAnchor}></a>
        <a className="anchor" data-dir="rb" onMouseDown={onMouseDownAnchor}></a>
      </div>
    </div>
  );
}



