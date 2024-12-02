import React, { useState } from 'react'
import './index.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function MySkeleton() {
    
    return (
        <div style={{height:'200px'}}>
            <Skeleton circle baseColor='#202020' highlightColor="#444" width={200} height={'100%'}/>
            <div className='test1'>test1</div>
            <div className='test2'>test2</div>
        </div>
        
    )
}
