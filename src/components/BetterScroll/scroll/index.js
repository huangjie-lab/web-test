import React from 'react'
import BScroll from 'better-scroll'
import { useState,useRef ,useEffect} from 'react'

export default function Scroll({
    wrapHeight,children,onPullup,onPulldown,prop
}) {
    //  外层的wrap实例
    const wrapRef = useRef(null)
    //  记录Better-scroll是否实例化，为后续挂载下拉刷新和上拉加载做准备
    const initRef = useRef(false)
    //  存储better-scroll的实例
    const [scrollObj, setscrollObj] = useState({})
    //  better-scroll的配置参数
    const initBScroll = () => {
        setscrollObj(
        new BScroll(wrapRef.current, {
            //probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
            probetype: 3,
            //  可以使用原生的点击
            click: true,
            //  检测dom变化
            observeDOM: true,
            //  鼠标滚轮设置
            mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300
            },
            //  显示滚动条
            scrollY: true,
            scrollbar: true,
            //  过度动画, 在下载更多的时候滚动条会有个过度动画
            useTransition: true,
            //  下拉刷新
            pullDownRefresh: {
            threshold: 70,
            stop: 0
            },
            //  上拉加载更多
            pullUpLoad: {
            threshold: 90,
            stop: 10
            }
        })
        )
    }

    //  对象初始化
    useEffect(() => {
        initBScroll()
        return () => {
            //  组件卸载时记得将其销毁
            scrollObj?.destroy()
        }
    }, [])
   
    //  下拉刷新
    const pulldown = async () => {
        onPulldown && (await onPulldown())
        setTimeout(() => {
        //  记得使用finishPullDown，不然你只能下拉一次
        scrollObj?.finishPullDown()
        //  下拉之后你的content会发生变化，如果不使用refresh，你需要滑动一下才能刷新content的高度
        scrollObj?.refresh()
        }, 500)
    }
   
    //  上拉加载
    const pullup = async () => {
        onPullup && (await onPullup())
        setTimeout(() => {
        scrollObj?.finishPullUp()
        scrollObj?.refresh()
        }, 500)
    }

    //  对象事件挂载
    useEffect(() => {
        if (initRef.current === true) {
            //  下拉刷新
            //  每次更新都需要先把之前的pullingDown事件清除，不然会累加
            scrollObj?.off("pullingDown");
            scrollObj?.once("pullingDown", pulldown);
        
            //  上拉加载
            //  每次更新都需要先把之前的pullingUp事件清除，不然会累加
            scrollObj?.off("pullingUp");
            scrollObj?.once("pullingUp", pullup);
            } else {
            initRef.current = true;
        }
        //  为什么监听prop是因为这边监听不到外面的state变化
        //  handlePullUp的[...state, ...res.data]中的state会中始终为一开始的[]
    }, [prop]);
    return (
        <div className="scroll-warpper" ref={wrapRef} style={{ height: wrapHeight, overflow: 'hidden' }}>
            <div className="scroll-content">
            {children}
            </div>
        </div>
    )
}
