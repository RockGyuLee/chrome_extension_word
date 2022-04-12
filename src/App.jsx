import { useState, useLayoutEffect, useEffect } from 'react'
import { Layout } from './Components/Layout'
import { HText, Text } from './Components/Texts'
import { Button } from './Components/Buttons';
import { CheckBtn } from './Components/Buttons';
import Rock from "../imgs/rock.png"
import './App.css'

import dataJson from "./datas.json";
import { putRandomIndex, getRandom4Datas } from "./utils/util";

function App() {
  let [rIdx, setRIdx ] = useState(putRandomIndex(dataJson))
  let [ dataItem, setDataItem ] = useState({});
  let [ contentList, setContentList ] = useState([]);
  let [ correctIdx, setCorrectIdx ] = useState(0);
  let [ keyIndex, setKeyIndex ] = useState(Math.random());

  useEffect(()=>{
    if(correctIdx == 0 ){
      setKeyIndex(Math.random())
    }
  },[ correctIdx])

  useLayoutEffect(()=>{
    setDataItem(dataJson[rIdx])

    let copy_list = dataJson.slice();
    copy_list.splice(rIdx, 1);

    let c_list = getRandom4Datas(copy_list, dataJson[rIdx]);
    setContentList(c_list);
  }, [setRIdx]);

  const handleClick = (value) => {
    // let cList = contentList[idx];
    setCorrectIdx( value );
  }

  // console.log("correctIdx",correctIdx)

  return (
    <Layout height={"100vh"}>
      <div style={{ display : "flex", height : "50%", justifyContent : "center", alignItems : "center", }}>
        <HText className={correctIdx != 0 && "correctH1"} size={"4rem"}>
          {dataItem.WORD}
        </HText>
      </div>
      <div style={{ display : "flex", justifyContent : "center", alignItems : "center", }}>
        {
          contentList.map((c, idx)=>{
            return (
              <CheckBtn key={idx} corIdx={correctIdx} showWord={dataItem}  data={c} onClick={handleClick}/>
            )
          })
        }
      </div>
    </Layout>
  )
}

export default App
