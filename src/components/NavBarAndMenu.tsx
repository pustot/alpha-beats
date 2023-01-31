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
import { ColorModeContext, LangContext } from "../App";
import { getLocaleText, LangCode } from "../data/I18n";
import "../styles.scss";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FeedIcon from "@mui/icons-material/Feed";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBarAndMenu(props: {
    theme: Theme;
    langSetter: React.Dispatch<React.SetStateAction<LangCode>>;
}) {
    const { theme, langSetter } = props;
    const colorMode = React.useContext(ColorModeContext);
    const lang = React.useContext(LangContext);

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
            <List>
                <ListItem key="nameLogo" disablePadding>
                    <ListItemButton component={MuiLink} href="https://yangchnx.com">
                        <ListItemText
                            inset
                            primary={getLocaleText(
                                {
                                    "en": "Chenxi Yang",
                                    "zh-Hant": "楊晨曦",
                                    "zh-Hans": "杨晨曦",
                                    "tto-bro": "EeRZ T8eHXQea",
                                    "tto": "hFCmo mAFKRHm",
                                    "ja": "楊晨曦",
                                    "de": "Chenxi Yang",
                                },
                                lang
                            )}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem key="home" disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        {getLocaleText(
                            {
                                "en": "Flashcard",
                                "zh-Hant": "字卡",
                                "zh-Hans": "字卡",
                                "tto-bro": "98d3 Ar",
                                "tto": "9d ArD",
                                "ja": "フラッシュカード",
                                "de": "Speicherkarte",
                            },
                            lang
                        )}
                    </ListItemButton>
                </ListItem>


            </List>

            <Divider />

            <List>
                <ListItem key="theme" disablePadding>
                    <ListItemButton onClick={colorMode.toggleColorMode}>
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
                        onChange={handleLangChange}
                    >
                        <MenuItem value={"en"}>English</MenuItem>
                        <MenuItem value={"zh-Hans"}>简体中文</MenuItem>
                        <MenuItem value={"zh-Hant"}>繁體中文</MenuItem>
                        <MenuItem value={"ja"}>日本語</MenuItem>
                        <MenuItem value={"de"}>Deutsch</MenuItem>
                        <MenuItem value={"tto-bro"}>b8Q7Z2D.</MenuItem>
                        <MenuItem value={"tto"}>mim</MenuItem>
                    </Select>
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
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: "flex", overflow: "auto" }}>
                        <Button
                            variant="text"
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                textTransform: "none",
                                fontSize: 16,
                            }}
                            component={Link}
                            to="/"
                        >
                            {getLocaleText(
                            {
                                "en": "Flashcard",
                                "zh-Hant": "字卡",
                                "zh-Hans": "字卡",
                                "tto-bro": "98d3 Ar",
                                "tto": "9d ArD",
                                "ja": "フラッシュカード",
                                "de": "Speicherkarte",
                            },
                            lang
                        )}
                        </Button>
                    
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: "block", md: "flex" },
                            overflow: "hidden",
                        }}
                    >
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton
                            onClick={handleLangMenuClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={isLangMenuOpen ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={isLangMenuOpen ? "true" : undefined}
                            color="inherit"
                        >
                            <LanguageIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={isLangMenuOpen}
                            onClose={handleLangMenuClose}
                            onClick={handleLangMenuClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleLangMenuItemClick("en");
                                }}
                            >
                                English
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleLangMenuItemClick("zh-Hans");
                                }}
                            >
                                简体中文
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleLangMenuItemClick("zh-Hant");
                                }}
                            >
                                繁體中文
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleLangMenuItemClick("ja");
                                }}
                            >
                                日本語
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleLangMenuItemClick("de");
                                }}
                            >
                                Deutsch
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleLangMenuItemClick("tto-bro");
                                }}
                            >
                                b8Q7Z2D.
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleLangMenuItemClick("tto");
                                }}
                            >
                                mim
                            </MenuItem>
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
