import { useState, useLayoutEffect, useEffect } from 'react'
import { Layout } from './Components/Layout'
import { HText, Text } from './Components/Texts'
import { Button } from './Components/Buttons';
import DisplayBtnGrp from './Components/DisplayBtnGrp';
import { CheckBtn } from './Components/Buttons';
import Rock from "../imgs/rock.png"
import './App.css'

import dataJson from "./datas.json";
import { putRandomIndex, getRandom4Datas } from "./utils/util";

function App() {

  //random Index 
  let [rIdx, setRIdx ] = useState(putRandomIndex(dataJson))
  
  let [ dataItem, setDataItem ] = useState({});
  let [ answerIdx, setAnswerIdx ] = useState(-1);
  let [ contentList, setContentList ] = useState([]);

  // 사용자의 클릭이 정답인지 아닌지 체크하는 state
  let [ selectedIndex, setSelectedIndex ] = useState(-1);

  let [ correctIdx, setCorrectIdx ] = useState(0);
 

  useLayoutEffect(()=>{
    let data = dataJson[rIdx];
    setDataItem(data)

    let copy_list = dataJson.slice();
    copy_list.splice(rIdx, 1);

    let c_list = getRandom4Datas(copy_list, data);
    setAnswerIdx( c_list.findIndex(c => c.WORD == data.WORD));
    setContentList(c_list);
    
  }, [setRIdx]);

  const handleClick = (index) => {
    setSelectedIndex(index)
  }

  console.log("answerIndex",selectedIndex, answerIdx)

  return (
    <Layout height={"100vh"}>
      <div style={{ display : "flex", height : "50%", justifyContent : "center", alignItems : "center", }}>
        <HText className={selectedIndex == answerIdx && "correctH1"} size={"4rem"}>
          {dataItem.WORD}
        </HText>
      </div>
      <div key={selectedIndex} style={{ display : "flex", justifyContent : "center", alignItems : "center", }}>
        {
          contentList.map((c, idx)=>{
            return (
              <CheckBtn key={idx} idx={idx} selIdx={selectedIndex} answerIdx={answerIdx} answerValue={contentList[answerIdx]} data={c} onClick={handleClick}/>
            )
          })
        }
      </div>
    </Layout>
  )
}

export default App
