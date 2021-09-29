import React from 'react';
import useAsync from "../util/useAsync";
import { getEngWords } from "../firebase/selecDb";
import { Container, Flex, TitleWord ,Text, MButton} from "../components/Main";

function EngWordsPage(){

    const [state, refetch] = useAsync(getEngWords);

    const { loading, data, error } = state;

    console.log("loading, data, error",loading, data, error);

    return (
        <Container>
            <Container height={"30vh"} css={{"paddingBotton" : "2vh"}}>
                <Flex css={{
                    "width" : "100%",
                    "height" : "100%",
                    "flexWrap" : "wrap",
                    "alignContent" : "flex-end",
                    "justifyContent" : "center",
                }}>
                    <TitleWord size={"hd"}>
                        Happy
                    </TitleWord>
                </Flex>
            </Container>
            <Container height={"70vh"}>
                <Flex css={{
                    "width" : "100%",
                    "height" : "100%",
                    "alignItems": "center",
                }}>
                    <Flex
                        css = {{
                            "width" : "100vw",
                            "justifyContent": "space-evenly"
                        }}
                    >
                        <MButton css ={{
                            width : "10vw",
                            height : "10vh"
                        }}>
                            <Text>test</Text>
                        </MButton>
                        <MButton>
                            <Text>test</Text>
                        </MButton>
                        <MButton>
                            <Text>test</Text>
                        </MButton>
                        <MButton>
                            <Text>test</Text>
                        </MButton>
                    </Flex>
                </Flex>
            </Container>
            
        </Container>
    )
}

export default EngWordsPage