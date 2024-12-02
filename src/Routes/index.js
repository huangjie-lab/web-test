import {  Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from '../components/Home';
import About from '../components/About';
import TestI18n from '../components/TestI18n';
import InfiniteScroll from '../components/InfiniteScroll';
import TestAsync from '../components/TestAsync';
import { useState } from 'react';
import i18n from '../i18n/config/i18n';
import FileChunks from '../components/FileChunks';
import FuwenBen from '../components/FuwenBen';
import ClientHeight from '../components/ClientHeight';
import MySkeleton from '../components/MySkeleton';
import SkeletonTest from '../components/SkeletonTest';
import TestTs from '../components/TsTest';

const routes = [
    {
        path: '/home',
        exact: true,
        component: Home,
    },
    {
        path:'/testTs',
        exact: true,
        component: TestTs
    },
    {
        path: '/about',
        exact: true,
        component: About,
    },
    {
        path: '/testI18n',
        exact: true,
        component: TestI18n,
    },
    {
        path: '/infiniteScroll',
        exact: true,
        component: InfiniteScroll,
    },
    {
        path: '/testAsync',
        exact: true,
        component: TestAsync,
    },
    {
        path: '/fileChunks',
        exact: true,
        component: FileChunks,
    },
    {
        path: '/fuwenBen',
        exact: true,
        component: FuwenBen,
    },
    {
        path: '/clientHeight',
        exact: true,
        component: ClientHeight,
    },
    {
        path: '/mySkeleton',
        exact: true,
        component: MySkeleton,
    },
    {
        path: '/skeletonTest',
        exact: true,
        component: SkeletonTest,
    },
]

export const Routes = () => {
    const location = useLocation();
    const [preLang,setPreLang] = useState("en");
    const changeLang  = ()=>{
        if(preLang.toString() === 'zh') {    
          i18n.changeLanguage('en')  
          setPreLang("en") 
        } else {   
          i18n.changeLanguage('zh')              
          setPreLang("zh") 
        }
    }
    return (<>
        <button onClick={changeLang}>中英文切换</button>
        <TransitionGroup style={{height:'100%'}}>
            <CSSTransition timeout={500}>
                <Switch location={location}>
                    {routes.map((val, key) => (
                        <Route {...val} key={`route_${key}`}/>
                    ))}
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    </>
    );
};