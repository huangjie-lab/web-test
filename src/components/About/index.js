import React, { createRef,forwardRef} from 'react'
import styles from './index.module.scss'
import { useImperativeHandle } from 'react';
import { useRef } from 'react';
import { $t } from '../../i18n/config/i18n';
// export default function About() {
//   return (
//     <div className={styles.wrap}>
//       我是两行自动换的文本我是两行自动换的文本我是两行自动换的文本我是两行自动换的文本我是两行自动换的文本我是两行自动换的文本我是两行自动换的文本
//     </div>
//   )
// }

class Test extends React.PureComponent {
  test() {
    console.log("Test111");
  }
  render() {
    return <h2>Test</h2>;
  }
}
// 创建一个函数组件, 作为子组件测试
// 使用forwardRef将函数包裹起来
const Foo = forwardRef(function(props, ref) {
  const testfoo = () => {
    console.log('testfoo');
  }
  useImperativeHandle(ref, () => {
    return {
      testfoo
    }
  },[])
  return (
    <h2 ref={ref}>Foo</h2>
  )
})

// export default class About extends React.Component{
//   constructor(){
//     super()
//     this.testRef = createRef();
//     this.fooRef = createRef();
//   }
//   getDom() {
//     this.testRef.current.test();
//     console.log(this.fooRef.current,'current');
//     this.fooRef.current.testfoo();
//   }
//   render() {
//     return (
//       <div>
//         <Test ref={this.testRef}/>
//         <Foo  ref={this.fooRef}/>
//         <button onClick={() => this.getDom()}>获取DOM</button>
//       </div>
//     )
//   }
// }


const About = () => {
  // const testRef = useRef();
  // const fooRef = useRef();
  const testRef = createRef();
  const fooRef = createRef();
  const getDom = () => {
    testRef.current.test();
    fooRef.current.testfoo();
  }
  return (
    <div>
      <Test ref={testRef}/>
      <Foo  ref={fooRef}/>
      <button onClick={getDom}>{$t('About.index.196655-0')}</button>
    </div>
  )
}
export default About;