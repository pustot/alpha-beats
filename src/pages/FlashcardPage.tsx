import "purecss/build/pure.css";
import * as React from "react";
import "../styles.scss";

import {
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    Link as MuiLink,
    Stack,
    Switch,
    Typography,
} from "@mui/material";

import { getLocaleText, I18nText } from "../utils/I18n";

import FlashCard from "../components/FlashCard";
import { fetchData } from "../api/data";

const scriptList = ["arabic", "devanagari", "hebrew", "tamil"];
const dataList = new Map<string, string[][]>();

export default function Home(props: { lang: keyof I18nText }) {
    const { lang } = props;
    const [pronunciationDataLarge, setPronunciationDataLarge] = React.useState([["ا", "ʾ/ʔ/"]]);
    const [char, setChar] = React.useState("ا");
    const [roma, setRoma] = React.useState("ʾ/ʔ/");
    const [isInitialized, setIsInitialized] = React.useState(false);
    const [isLarge, setIsLarge] = React.useState(false);
    const [script, setScript] = React.useState("arabic")

    React.useEffect(() => {
        (async () => {
            // const [pronunciationDataSmall, pronunciationDataLarge] =
            //   await Promise.all([promiseDataSmall, promiseDataLarge]);
            // setPronunciationDataSmall(pronunciationDataSmall);
            for (let script of scriptList) {
                const data = await fetchData("https://twaqngu.github.io/alpha-beats/data/" + script + ".tsv");
                dataList.set(script, data);
                // console.log("get " + script + ' ' + dataList.get(script))
            }
            // const araData = await fetchData("/data/arabic.tsv");
            // const devaData = await fetchData("/data/devanagari.tsv");
            // const hebData = await fetchData("/data/hebrew.tsv");
            // const tamData = await fetchData("/data/tamil.tsv");
            // setPronunciationDataLarge([...araData, ...devaData, ...hebData, ...tamData]);
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
        const nextScript = scriptList[Math.floor(Math.random() * scriptList.length)];
        const idx = Math.floor(Math.random() * dataList.get(nextScript)!.length);
        const [nextchar, nextroma] = dataList.get(nextScript)![idx];
        setScript(nextScript);
        setChar(nextchar);
        setRoma("...");
        window.setTimeout(() => {
            setRoma(nextroma);
        }, 2000);
    };

    const handleSwitchLarge = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLarge(event.target.checked);
    };

    return (
        <Container maxWidth="md">
            <Stack spacing={4} px={2} pb={4}>
                <Typography>
                    {getLocaleText(
                        {
                            "en": "Display random flashcards with letter and pronunciation (with romanization).",
                            "zh-Hant": "持續展示隨機字卡，字卡包含字母及其發音和羅馬化",
                            "zh-Hans": "持续展示随机字卡，字卡包含字母及其发音和罗马化",
                            "tto-bro":
                                "D8lddemA DleaH268e3 dvaYde 98d3Ar, 98d3Ar bQrnX8iV 98d3Vn2 Y8QehY8d bvoLOQeV X8nm SmVQr2XQnr3",
                            "tto": "DaVonCLKrKa X NScWArrD e QncHDiV eo rShr oLN NrL-eiV eoNN KoVrTe.",
                            "ja": "このページでは、文字と (ローマ字表記と) 発音を含むランダムなフラッシュ カードを表示します。",
                            "de": "Es zeigt zufällige Karteikarten mit Buchstaben und Aussprache (mit Umschrift).",
                            "ko": "문자와 발음(로마자 표기 포함)이 포함된 임의의 플래시 카드를 표시합니다.",
                            "fr": "Cette page affiche des flashcards aléatoires avec lettre et prononciation (avec romanisation).",
                        },
                        lang
                    )}
                </Typography>

                <FormControlLabel
                    control={
                        <Switch
                            checked={isLarge}
                            onChange={handleSwitchLarge}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    }
                    label={getLocaleText(
                        {
                            "en": "Larger",
                            "zh-Hant": "放大",
                            "zh-Hans": "放大",
                            "tto-bro": "bvrZ3D8rQ3",
                            "tto": "7s DrQ",
                            "ja": "拡大",
                            "de": "Vergrößern",
                            "ko": "확대",
                            "fr": "Agrandir",
                        },
                        lang
                    )}
                />

                <FlashCard script={script} char={char} roma={roma} isLarge={isLarge}></FlashCard>

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
