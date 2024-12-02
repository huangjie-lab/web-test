import React from 'react';
type TsTestProps = {
    name:string
}
const TsTest:React.FC<TsTestProps>= React.memo((props) => {
    const {name} = props;
  const list:string[] = ['dog','cat','lion']
  const dom:HTMLElement = document.body;
  return (
    <>
        {
            list.map(item => {
                return <div key={item}>{item}</div>
            })
        }
        <span>{name}</span>
    </>
  );
})
export default TsTest;