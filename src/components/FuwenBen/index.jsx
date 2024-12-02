import { useEffect } from "react";
import './index.scss';
function FuwenBen() {   
  useEffect(() => {
    // document.addEventListener('mouseup',() => {
    //   const selection = window.getSelection();
    //   console.log(selection,'selection');
    //   if (selection?.rangeCount > 0) {
    //     const selectedText = selection.toString();
    //     console.log("选中的文本: ", selectedText);
    //     let range = selection.getRangeAt(0);
    //     let newNode = document.createElement("span");
    //     newNode.classList.add("highlight");
    //     range.surroundContents(newNode);
    //   }
    // })
  },[])
  return (<>
    <p className="test">这是一段示例文本，您可以尝试选中一部分。</p>
    <div className="wrap" onClick={()=>{console.log(123);
      }}>
      a
    </div>
  </>)
}
export default FuwenBen;