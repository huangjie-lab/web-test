import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

// 模拟列表数据
const dataSource = new Array(20).fill(0).map((_, index) => ({
    title: `这是一条信息${index}`,
}));
export default function InfiniteScroll() {
    let [list,setList] = useState([...dataSource]);
    const scrollRef = useRef(null);
    useEffect(() => {
        // 滚动的距离
        let top = 0;
        // 索引
        let index = 0;
        // 记录原始数据的长度
        let len = dataSource.length;
        const scroll = () => {
            scrollRef.current?.scrollTo({
                top: top++,
            });
            if (top % 22 === 0) {
                // 哪一项滚不见了，就拿这一项 push 到列表中
                let target = list[index];
                setList(old => [...old,target]);
                if (index < len - 1) {
                    // 不断递增
                    index++
                } else {
                    // 刚好滚动完一轮，重新来过，初始化数据
                    top = 0;
                    index = 0;
                    scrollRef.current?.scrollTo({
                        top: 0,
                    });
                    setList([...dataSource])
                }
            }
            requestAnimationFrame(scroll);
        }
        scroll();
    },[])
    return (<>
        <div className="scroll-container" ref={scrollRef}>
            {
                list.map((item,index) => <div className='inner' key={index}>{item.title}</div>)
            }
        </div>
        <div className='ellipsis'>ceshi</div>
        </>)
}
