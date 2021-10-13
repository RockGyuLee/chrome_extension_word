import React, {useState, useEffect, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

//module Function import
import { getRandomArbitrary, getRandomAr4Answer, getShuffleArray } from "../util/util";
import useAsync from "../util/useAsync";
import { getEngWords } from "../firebase/selecDb";
import { ReactContainer, Container, Flex, TitleWord ,Icon} from "../components/Main";
import { MButton } from "../components/Button";

// function EngWordsPage(){

//     const [state, refetch] = useAsync(getEngWords);

//     const { loading, data, error } = state;

//     const [word, setWord] = useState(undefined);
//     const [descriptionArr, setDescription] = useState(undefined);


//     useEffect(()=>{
//         if(data === null) return;
//         let list = data[0].word;
//         let randomIndex = getRandomArbitrary(0, list.length);
//         setWord(list[randomIndex]);
//         let descArr = getRandomAr4Answer(list, list.length, randomIndex);
//         let desc = getShuffleArray(descArr);
//         setDescription(desc);
//     },[state]);

//     return (
//         <Container>
//             <ReactContainer 
//                 elg={12} lg={12} md={12} sm={12} esm={12} height={3}>
                
//                 <Flex css={{
//                     "width" : "100%",
//                     "height" : "100%",
//                     "flexWrap" : "wrap",
//                     "alignContent" : "flex-end",
//                     "justifyContent" : "center",
//                 }}>
                    
//                     <TitleWord size={"hd"}>
//                         {
//                             ( word != undefined ) && word.spelling
//                         }
//                     </TitleWord>
//                     <TitleWord size={"md"}>
//                         <Icon >
//                             <FontAwesomeIcon icon={faRedo} onClick={refetch}/>
//                         </Icon>
//                     </TitleWord>
//                 </Flex>
//             </ReactContainer>
//             <ReactContainer elg={12} lg={12} md={12} sm={12} esm={12}
//                 height={9}
//             >
//                 <Flex css={{
//                     "width" : "100%",
//                     "height" : "100%",
//                     "alignItems": "center",
//                 }}>
//                     <Flex
//                         css = {{
//                             "width" : "100vw",
//                             "justifyContent": "space-evenly",
//                             "marginBottom" : "10vh"
//                         }}
//                     >
//                         {/* {
//                            ( descriptionArr != undefined ) && descriptionArr.map((item, index)=>{
//                                 return (
//                                     <MButton key={index} isCheck={false} wordList={word} text={item}/>                                        
//                                 )
//                             })
//                         } */}
//                         {
//                            ( descriptionArr != undefined ) && descriptionArr.map((item, index)=>{
//                                 return (
                                    
//                                     <MButton key={index} isCheck={false} word={word} text={item.description}/>                                        
//                                 )
//                             })
//                         }
//                     </Flex>
//                 </Flex>
//             </ReactContainer>
//         </Container>
//     )
// }

function EngWordsPage(){

    const [state, refetch] = useAsync(getEngWords);

    const { loading, data = null, error } = state;

    const [word, setWord] = useState(undefined);
    const [descriptionArr, setDescription] = useState(undefined);



    useEffect(()=>{
        if(data === null) return;
        let list = data[0];
        console.log(list);
        let rI = getRandomArbitrary(0, list.length);
        setWord(list[rI]);

        let descArr = getRandomAr4Answer(list, list.length, rI);
        console.log(descArr)
        let desc = getShuffleArray(descArr).map(item => item);
        setDescription(desc);
    },[state]);

    return (
        <Container>
            <ReactContainer 
                elg={12} lg={12} md={12} sm={12} esm={12} height={3}>
                
                <Flex css={{
                    "width" : "100%",
                    "height" : "100%",
                    "flexWrap" : "wrap",
                    "alignContent" : "flex-end",
                    "justifyContent" : "center",
                }}>
                    
                    <TitleWord size={"hd"}>
                        {
                            ( word != undefined ) && word.spelling
                        }
                    </TitleWord>
                    <TitleWord size={"md"}>
                        <Icon >
                            <FontAwesomeIcon icon={faRedo} onClick={refetch}/>
                        </Icon>
                    </TitleWord>
                </Flex>
            </ReactContainer>
            <ReactContainer elg={12} lg={12} md={12} sm={12} esm={12}
                height={9}
            >
                <Flex css={{
                    "width" : "100%",
                    "height" : "100%",
                    "alignItems": "center",
                }}>
                    <Flex
                        css = {{
                            "width" : "100vw",
                            "justifyContent": "space-evenly",
                            "marginBottom" : "10vh"
                        }}
                    >
                        {
                           ( descriptionArr != undefined ) && descriptionArr.map((item, index)=>{
                                return (
                                    <Fragment key={Math.random()}>
                                        <MButton key={index} isCheck={false} word={word} text={item.description}/>                                        
                                    </Fragment>
                                )
                            })
                        }
                    </Flex>
                </Flex>
            </ReactContainer>
        </Container>
    )
}

export default EngWordsPage