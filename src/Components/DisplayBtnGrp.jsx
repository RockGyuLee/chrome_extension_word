import { CheckBtn } from "./Buttons";

const _btnColor = {
    default : "#EBDBFA",
    succ : "white",
    fail : "#FE8F8F"
}

const _txtColor = {
    default : "black",
    succ : "#a62efd",
    fail : "white"
}

export default function DisplayBtnGrp(props){
    let { datas, answerIdx, selectedIndex, onClick} = props;

    const handleClick = (idx) => {
        onClick && onClick(idx);
    }

    console.log("DisplayBtnGrp",selectedIndex, answerIdx )

    return <div style={{ display : "flex", justifyContent : "center", alignItems : "center", }}>
        {
          datas.map((c, idx)=>{
            return (
              <CheckBtn key={idx} corIdx={selectedIndex} showWord={datas[answerIdx]}  data={c} onClick={handleClick}/>
            )
          })
        }
    </div>
} 

