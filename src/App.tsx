import { CssBaseline, Divider, PaletteMode, Typography } from "@mui/material";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import "purecss/build/pure.css";
import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./styles.scss";

import NavBarAndMenu, { NavItem } from "./components/NavBarAndMenu";
import { I18nText } from "./utils/I18n";
import Home from "./pages/FlashcardPage";
import Footer from "./components/Footer";
import HomeIcon from "@mui/icons-material/Home";

export default function App() {
    const [lang, setLang] = React.useState<keyof I18nText>(
        (localStorage.getItem("pustot/0.1/lang") as keyof I18nText) || ("en" as keyof I18nText)
    );

    const systemColor: string =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const [mode, setMode] = React.useState<string>(localStorage.getItem("pustot/0.1/mode") || systemColor);
    const toggleColorMode = () => {
        localStorage.setItem("pustot/0.1/mode", mode === "light" ? "dark" : "light");
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
    };

    const theme: Theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode as PaletteMode,
                },
            }),
        [mode]
    );

    const langSetter = (tar: keyof I18nText) => {
        setLang(tar);
    };

    const title: I18nText = {
        "en": "Alpha Beats",
        "zh-Hant": "字母跳動",
        "zh-Hans": "字母跳动",
        "tto": "rSNr be7",
        "tto-bro": "98d3Vn2 Lan3D8nZ2",
        "ja": "アルファ ビーツ",
        "de": "Alpha Beats",
        "ko": "알파 비트",
        "fr": "Alpha Beats",
    };

    const navItems: NavItem[] = [
        {
            name: {
                "en": "Flashcard",
                "zh-Hant": "字卡",
                "zh-Hans": "字卡",
                "tto-bro": "98d3 Ar",
                "tto": "9d ArD",
                "ja": "フラッシュカード",
                "de": "Speicherkarte",
                "ko": "플래시카드",
                "fr": "Carte mémoire",
            },
            link: "/alpha-beats",
            icon: <HomeIcon />,
        },
    ];

    const repoLink = "https://github.com/pustot/alpha-beats";

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <NavBarAndMenu
                    theme={theme}
                    toggleColorMode={toggleColorMode}
                    lang={lang}
                    langSetter={langSetter}
                    title={title}
                    navItems={navItems}
                />

                <br />
                <br />
                <br />

                <Routes>
                    <Route path="" element={<Home lang={lang} />} />
                    <Route path="/home" element={<Home lang={lang} />} />
                    {/* <Route path="/blog/:fileName" element={<BlogArticle lang={lang} />} /> */}
                </Routes>

                <br />
                <br />

                <Footer repoLink={repoLink} theme={theme} />
            </HashRouter>
        </ThemeProvider>
    );
}
