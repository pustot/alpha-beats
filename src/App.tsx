import { CssBaseline, Divider, PaletteMode, Typography } from "@mui/material";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import "purecss/build/pure.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.scss";

import NavBarAndMenu from "./components/NavBarAndMenu";
import { I18nText } from "./data/I18n";
import Home from "./pages/Home";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
});
export const LangContext = React.createContext("en");

export default function App() {
    const [lang, setLang] = React.useState<keyof I18nText>(
        (localStorage.getItem("yangchnx/0.1/lang") as keyof I18nText) || ("en" as keyof I18nText)
    );

    const systemColor: string =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const [mode, setMode] = React.useState<string>(localStorage.getItem("yangchnx/0.1/mode") || systemColor);
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                localStorage.setItem("yangchnx/0.1/mode", mode === "light" ? "dark" : "light");
                setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

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

    return (
        <ColorModeContext.Provider value={colorMode}>
            <LangContext.Provider value={lang}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <NavBarAndMenu theme={theme} langSetter={langSetter} />

                        <br />
                        <br />
                        <br />

                        <Routes>
                            <Route path="/" element={<Home lang={lang} />} />
                            <Route path="/home" element={<Home lang={lang} />} />
                            {/* <Route path="/blog/:fileName" element={<BlogArticle lang={lang} />} /> */}
                        </Routes>

                        <br />
                        <br />

                        <Divider />
                        <br />
                        <footer>
                            <Typography align="center">
                                Chenxi Yang <br />
                                <a href="https://github.com/yangchnx">
                                    <img
                                        src={
                                            "https://img.shields.io/badge/-@yangchnx-" +
                                            (theme.palette.mode === "dark" ? "000000" : "ffffff") +
                                            "?style=flat-square&logo=github&logoColor=" +
                                            (theme.palette.mode === "dark" ? "white" : "black")
                                        }
                                    />
                                </a>
                            </Typography>
                        </footer>
                        <br />
                    </BrowserRouter>
                </ThemeProvider>
            </LangContext.Provider>
        </ColorModeContext.Provider>
    );
}
