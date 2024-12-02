import React, { useState } from 'react'
import './index.scss'
import { useRouteMatch,useHistory } from 'react-router-dom';

export default function ClientHeight() {
    const match = useRouteMatch({
        path:'/ClientHeight',
        strict:true, //严格比配
    });
    const history = useHistory();
    console.log(match,'match');
    return (
        <div className='client-height'>
            11212
            <button onClick={() => {
                history.push('/about')
            }}>点我跳到about</button>
        </div>
    )
}
