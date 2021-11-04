import React, {useState, useEffect, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import PuffLoader from "react-spinners/PuffLoader";
import { useSelector } from 'react-redux';

//module Function import
import { getRandomArbitrary, getRandomAr4Answer, getShuffleArray } from "../util/util";
import useAsync from "../util/useAsync";
import { getEngWords } from "../firebase/selecDb";
import { ReactContainer, Container, Flex, TitleWord ,Icon} from "../components/Main";
import { MButton } from "../components/Button";

function EngWordsPage(){

    const wordDataList = useSelector( (state)=> state);
    const [word, setWord] = useState(undefined);
    const [descriptionArr, setDescription] = useState(undefined);

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

    console.log(descriptionArr)

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
                    {
                        // loading ? <PuffLoader color={"black"} loading={loading} size={100}/>
                        // :   
                        <>
                                <TitleWord size={"hd"}>
                                    {
                                        ( word != undefined ) && word.spelling
                                    }
                                </TitleWord>
                                <TitleWord size={"md"}>
                                    <Icon >
                                        <FontAwesomeIcon icon={faRedo} onClick={handleRefresh}/>
                                    </Icon>
                                </TitleWord>
                            </>
                    }
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