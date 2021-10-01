import React from 'react';
import useAsync from "../util/useAsync";
import { getEngWords } from "../firebase/selecDb";
import { ReactContainer, Container, Flex, TitleWord ,Text, MButton} from "../components/Main";

function EngWordsPage(){

    const [state, refetch] = useAsync(getEngWords);

    const { loading, data, error } = state;

    console.log("loading, data, error",loading, data, error);

    return (
        <Container>
            <ReactContainer 
                elg={12} lg={12} md={3} sm={12} esm={12}
                height={3}>
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
            </ReactContainer>
            <ReactContainer height={9}>
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
                        <MButton radius="12px" color="#C8D9EB">
                            <Text size="xxxl">행복한</Text>
                        </MButton>
                        <MButton radius="12px">
                            <Text>행복</Text>
                        </MButton>
                        <MButton radius="12px">
                            <Text>행운</Text>
                        </MButton>
                        <MButton radius="12px">
                            <Text>행복하게</Text>
                        </MButton>
                    </Flex>
                </Flex>
            </ReactContainer>
        </Container>
    )
}

export default EngWordsPage