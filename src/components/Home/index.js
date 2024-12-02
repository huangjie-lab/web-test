import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Button} from 'antd'
import { $t } from '../../i18n/config/i18n'
import {MySocket} from '../../utils/mySocket'
import './index.scss'

export default function Home() {
    const dispatch = useDispatch()
    const [index,setIndex] = useState(1);
    const user = useSelector((state) => {
        return state.useUserStore.userInfo;
    })
    const users = ()=>{
        dispatch({type:'useUserStore/incremented',value:Math.random()})
    }
    const startSocket = () => {
        var ws = new MySocket('ws://localhost:8180');
        ws.connect();
        ws.onOpen(() => {
            console.log('websocket已经onOpen了')
        })
        ws.onMessage((res) => {
            console.log('onMessage', res)
        })
    }
    return (
        <div> {$t('Home.index.578922-0')}-{user}
             <Button onClick={users} type='primary'>{$t('Home.index.578922-1')}</Button>
             <br/>
             <Button onClick={() => {
                setIndex((old) => {
                    return old + 1;
                })
             }} type='primary'>{$t('Home.index.578922-2')}----setstate----{index}</Button>
             <br/>
             <Button onClick={startSocket} type='primary'>测试socket</Button>
             <div className='myimg'></div>
        </div>
    )
}
