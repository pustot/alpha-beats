import "purecss/build/pure.css";
import * as React from "react";
import "../styles.scss";

import { Container, Grid, IconButton, Link as MuiLink, Stack, Typography } from "@mui/material";

import { getLocaleText, I18nText } from "../data/I18n";

import FlashCard from "../components/FlashCard";
import { promiseDataSmall, promiseDataLarge } from "../api/data";

export default function Home(props: { lang: keyof I18nText }) {
    const { lang } = props;
    const [pronunciationDataLarge, setPronunciationDataLarge] = React.useState([["ا", "ʾ/ʔ/"]]);
    const [char, setChar] = React.useState("ا");
    const [roma, setRoma] = React.useState("ʾ/ʔ/");
    const [isInitialized, setIsInitialized] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            // const [pronunciationDataSmall, pronunciationDataLarge] =
            //   await Promise.all([promiseDataSmall, promiseDataLarge]);
            // setPronunciationDataSmall(pronunciationDataSmall);
            const pronunciationDataLarge0 = await promiseDataLarge;
            setPronunciationDataLarge(pronunciationDataLarge0);
            setIsInitialized(true);
        })();
    }, []);

    React.useEffect(() => {
        const boardEvent = window.setInterval(refreshBoard, 4000);
        return () => {
            window.clearInterval(boardEvent);
        };
    }, [isInitialized]);

    const refreshBoard = () => {
        const idx = Math.floor(Math.random() * pronunciationDataLarge.length);
        const [nextchar, nextroma] = pronunciationDataLarge[idx];
        setChar(nextchar);
        setRoma("...");
        window.setTimeout(() => {
            setRoma(nextroma);
        }, 2000);
    };

    return (
        <Container maxWidth="md">
            <Stack spacing={4} px={2} pb={4}>
                <Typography>
                    Display flashcards with letter and pronunciation (with romanization) with your comfortable speed.
                </Typography>

                <FlashCard char={char} roma={roma}></FlashCard>

                {/* Search Module */}
                {/* <TextField defaultValue="វិទ្យាស្ថានខុងជឺនៃរាជបណ្ឌិត្យសភាកម្ពុជា" id="input" onChange={(v) => setSentence(v.target.value)}
          multiline
          minRows={2} 
          maxRows={Infinity} />
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="outlined" onClick={() => handleClick()} sx={{width: "auto"}}>Lookup</Button>
        </Stack> */}

                {/* Speed Changing Module */}
            </Stack>
        </Container>
    );
}
