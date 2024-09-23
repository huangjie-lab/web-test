
import {configureStore} from '@reduxjs/toolkit';
import useUserStore from './userinfoStore'


// 创建仓库并且暴露
export const store = configureStore({
    reducer:{
        useUserStore,
    }
})