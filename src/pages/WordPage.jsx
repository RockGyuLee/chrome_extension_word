import React, {useState, useEffect, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';

//module Function import
import { getRandomArbitrary, getRandomAr4Answer, getShuffleArray } from "../util/util";
import { ReactContainer, Container, Flex, TitleWord ,Icon} from "../components/Main";
import { MButton } from "../components/Button";

function EngWordsPage(){

    const wordDataList = useSelector( (state)=> {
        return state.data
    });

    const wordClassList = useSelector( (state)=> {
        return state.wordClass
    });
    
    console.log("wordClassList",wordClassList)
    //하면에 표시되는 단어와 해석이 들어있는 해석배열.
    const [word, setWord] = useState(undefined);
    const [descriptionArr, setDescription] = useState(undefined);

    // 새로고침 아이콘 클릭 시 state 변경을 통해 화면 새로고침 기능을 위한 변수.
    const [ refreshWordNum, setRefreshWordNum ] = useState( 0 );

    useEffect(()=>{
        let list = wordDataList["word"];
        let randomIndex = getRandomArbitrary(0, list.length);
        let descArr = getRandomAr4Answer(list,  randomIndex);

        setWord(list[randomIndex]);
        setDescription(getShuffleArray(descArr));
    },[ refreshWordNum ]);

    const handleRefresh = () => {
        let num = refreshWordNum + 1;
        setRefreshWordNum( num );
    }

    console.log("word",word);

    return (
        <Container>
            <ReactContainer 
                elg={12} lg={12} md={12} sm={12} esm={12}
                height={3}>
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
                        {
                            ( word != undefined ) && wordClassList['word'].find(i => i['spelling'] == word.wordClass)['description']
                        }
                    </TitleWord>
                    <TitleWord size={"md"}>
                        <Icon >
                            <FontAwesomeIcon icon={faRedo} onClick={handleRefresh}/>
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