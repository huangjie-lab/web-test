import React, { CSSProperties, useEffect, useState, useCallback } from "react";
import Scroll from "./scroll";
import axios, { Method } from "axios";
 
 
const BetterScroll = () => {
    const style = {
        width: "500px",
    };
  const request = (url, method) => {
    return new Promise((resolve, reject) => {
      const options = {
        url,
        method,
      };
      setTimeout(() => {
        const data = url === '/api/datasource' ? new Array(100).fill(0)  :new Array(100).fill(1)
        resolve(data);
      }, 1000);
    //   axios(options)
    //     .then((res) => {
    //       const data = res.data;
    //       resolve(data);
    //     })
    //     .catch((err) => reject(err));
    });
  };
 
  const getData = () => request("/api/datasource", "GET");
 
  const getMore = () => request("/api/abc", "GET");
 
  const [state, setstate] = useState([]);
 
  // 一开始拉取数据
  useEffect(() => {
    (async function () {
      const res = await getData();
      console.log(res);
       setstate(res);
    })();
  }, []);
 
  const handlePullUp = useCallback(async () => {
    const res = await getMore();
     setstate(state.concat(res));
  }, [state]);
 
  async function handlePullDown() {
    const res = await getData();
    setstate(res);
  }
 
  return (
    <div style={style}>
      <Scroll
        wrapHeight="500px"
        prop={state}
        onPullup={handlePullUp}
        onPulldown={handlePullDown}
      >
        {state.map((item, idx) =>
          idx % 2 === 0 ? (
            <div key={idx} style={{ height: "200px", background: "red" }}>
              {item}
            </div>
          ) : (
            <div key={idx} style={{ height: "200px", background: "green" }}>
              {item}
            </div>
          )
        )}
      </Scroll>
    </div>
  );
};
 
export default BetterScroll;