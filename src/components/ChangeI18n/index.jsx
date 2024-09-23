import React, { Component,useState,useEffect } from 'react';
import { useTranslation, Trans, Translation } from 'react-i18next'
import i18n from '../../i18n/config/i18n'; 

function ChangeI18n() {   
    // 注意： 如果使用非响应式数据，当数据变化后 ，页面将不更新。 
    const [pre_lang,setPreLang] = useState("");     // 上一次保存的语言
    const [pre_name,setPreName] = useState(""); // 上一次保存的名称  
    // 加载翻译组件, 可以在 i18n组件中引入， 也可以在useTranslation中引入
    // let {i18n} = useTranslation()          // 加载i18n组件 
    // 切换语言
    const changeLang  = ()=>{  
        if(pre_lang.toString() == 'zh') {    
          i18n.changeLanguage('en')     // 更改i18n语言   
          setPreLang("en") 
          setPreName("切换英文")
        } else {   
          i18n.changeLanguage('zh')              
          setPreLang("zh") 
          setPreName("切换中文")                    
        }
    }
    useEffect(() => {
        setPreLang("en") 
        setPreName("切换英文")
    },[])

    // 加载组件，用于翻译，但不限于放在哪一个组件。
    let { t } = useTranslation();
    return (
        <div> 
            <h1>下面是i18n使用的切换功能组件</h1>
            <button onClick={changeLang}>
                {pre_name}
            </button>   
 
            {/* 3种常用使用方式 */} 
            {/* <h2><Trans>home</Trans></h2>  
            <h2><Trans>测试</Trans></h2>  
            <h2><Trans>test words</Trans></h2>   */}
            <h1>{t('首页')}</h1>
            <h1>{t('测试')}</h1>
            {/* <Translation>
                {t => <h3>{t('home')}</h3>} 
            </Translation>    */}
        </div>  
    ) 
}
 
export default ChangeI18n;