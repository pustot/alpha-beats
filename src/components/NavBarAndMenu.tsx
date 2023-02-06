import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Link as MuiLink,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
    Toolbar,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import "purecss/build/pure.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { getLocaleText, I18nText, LangCode, languageCodeToLocale } from "../utils/I18n";
import "../styles.scss";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";

export interface NavItem {
    name: I18nText;
    link: string;
    icon: JSX.Element;
}

export default function NavBarAndMenu(props: {
    theme: Theme;
    toggleColorMode: () => void;
    lang: keyof I18nText;
    langSetter: React.Dispatch<React.SetStateAction<LangCode>>;
    title: I18nText;
    navItems: NavItem[];
}) {
    const { theme, toggleColorMode, lang, langSetter, title, navItems } = props;
    // const colorMode = React.useContext(ColorModeContext);

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLElement) | undefined>();
    const isLangMenuOpen = Boolean(anchorEl);

    const handleLangMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLangMenuClose = () => {
        setAnchorEl(undefined);
    };

    const toggleDrawer =
        (open: boolean) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>) => {
            // if (
            //     event.type === "keydown" &&
            //     (event.key === "Tab" || event.key === "Shift")
            // ) {
            //     return;
            // }

            setIsDrawerOpen(open);
        };

    const handleLangChange = (event: SelectChangeEvent) => {
        console.log(event.target);
        langSetter(event.target.value as LangCode);
        localStorage.setItem("yangchnx/0.1/lang", event.target.value);
    };

    const handleLangMenuItemClick = (tar: LangCode) => {
        console.log(tar);
        langSetter(tar);
        localStorage.setItem("yangchnx/0.1/lang", tar);
    };

    const IndexDrawer = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <Toolbar>{getLocaleText(title, lang)}</Toolbar>
            <Divider />
            <List>
                {navItems.map((item: NavItem, idx) => (
                    <ListItem key={idx} disablePadding>
                        <ListItemButton
                            component={item.link.slice(0, 4) == "http" ? MuiLink : Link}
                            to={item.link}
                            href={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {getLocaleText(item.name, lang)}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List>
                <ListItem key="theme" disablePadding>
                    <ListItemButton onClick={toggleColorMode}>
                        <ListItemIcon>
                            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                        </ListItemIcon>
                        {getLocaleText(
                            {
                                "en": "Colour Theme",
                                "zh-Hant": "主題",
                                "zh-Hans": "主题",
                                "tto-bro": "Tvo2D8ae",
                                "tto": "VvaH",
                                "ja": "テーマ",
                                "de": "Farbthema",
                                "ko": "주제",
                                "fr": "Thème",
                            },
                            lang
                        )}
                    </ListItemButton>
                </ListItem>

                <ListItem key="page-language">
                    <ListItemIcon>
                        {" "}
                        <LanguageIcon />{" "}
                    </ListItemIcon>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={lang}
                        label="Language"
                        onChange={handleLangChange}>
                        {["en", "zh-Hans", "zh-Hant", "ja", "de", "tto-bro", "tto", "ko", "fr"].map((s, idx) => (
                            <MenuItem key={idx} value={s as LangCode}>
                                {languageCodeToLocale(s, s)}
                            </MenuItem>
                        ))}
                    </Select>
                </ListItem>

                <ListItem key="nameLogo" disablePadding>
                    <ListItemButton component={MuiLink} href="https://yangchnx.com/">
                        <ListItemText
                            inset
                            primary={getLocaleText(
                                {
                                    "en": "Chenxi Yang",
                                    "zh-Hant": "楊晨曦",
                                    "zh-Hans": "杨晨曦",
                                    "tto-bro": "EerZ T8eHXQea",
                                    "tto": "hnCLo LrnKrHL",
                                    "ja": "楊晨曦",
                                    "de": "Chenxi Yang",
                                    "ko": "양신희",
                                    "fr": "Chenxi Yang",
                                },
                                lang
                            )}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: "flex", overflow: "auto" }}>
                        {navItems.map((item: NavItem, idx) => (
                            <Button
                                key={idx}
                                variant="text"
                                sx={{
                                    color: "white",
                                    display: "block",
                                    textTransform: "none",
                                    fontSize: 16,
                                    margin: 1,
                                    flexShrink: 0,
                                }}
                                component={item.link.slice(0, 4) == "http" ? MuiLink : Link}
                                to={item.link}
                                href={item.link}>
                                {getLocaleText(item.name, lang)}
                            </Button>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                        }}>
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton
                            onClick={handleLangMenuClick}
                            size="small"
                            aria-controls={isLangMenuOpen ? "language-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={isLangMenuOpen ? "true" : undefined}
                            color="inherit">
                            <LanguageIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="language-menu"
                            open={isLangMenuOpen}
                            onClose={handleLangMenuClose}
                            onClick={handleLangMenuClose}>
                            {["en", "zh-Hans", "zh-Hant", "ja", "de", "tto-bro", "tto", "ko", "fr"].map((s, idx) => (
                                <MenuItem
                                    key={idx}
                                    onClick={() => {
                                        handleLangMenuItemClick(s as LangCode);
                                    }}>
                                    {languageCodeToLocale(s, s)}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <br />

            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                {IndexDrawer()}
            </Drawer>
        </div>
    );
}
