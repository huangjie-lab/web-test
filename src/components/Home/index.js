import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Button} from 'antd'
import { $t } from '../../i18n/config/i18n'

export default function Home() {
    const dispatch = useDispatch()
    const [index,setIndex] = useState(1);
    const user = useSelector((state) => {
        return state.useUserStore.userInfo;
    })
    const users = ()=>{
        dispatch({type:'useUserStore/incremented',value:Math.random()})
    }
    return (
        <div> {$t('首页')}-{user}
             <Button onClick={users} type='primary'>{$t('点我')}</Button>
             <br/>
             <Button onClick={() => {
                setIndex((old) => {
                    return old + 1;
                })
             }} type='primary'>{$t('测试')}----setstate----{index}</Button>
        </div>
    )
}
