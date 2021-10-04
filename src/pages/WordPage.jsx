import React, {useState, useEffect} from 'react';
import useAsync from "../util/useAsync";
import { getEngWords } from "../firebase/selecDb";
import { ReactContainer, Container, Flex, TitleWord ,Text} from "../components/Main";
import { MButton } from "../components/Button";

//module Function import
import { getRandomArbitrary, getRandomAr4Answer } from "../util/util";

function EngWordsPage(){

    const [state, refetch] = useAsync(getEngWords);

    const { loading, data, error } = state;

    const [word, setWord] = useState(undefined);

    useEffect(()=>{
        if(data === null) return;
        let list = data[0].word;
        let randomIndex = getRandomArbitrary(0, list.length);
        setWord(list[randomIndex]);
    },[data]);

    //test logic start
    let descriptionArr = [
        "행복한",
        "행복",
        "행운",
        "행복하게"
    ]

    //test logic end;

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
                            descriptionArr.map((item, index)=>{
                                return (
                                    <MButton key={index} isCheck={false} wordList={word} text={item}/>                                        
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