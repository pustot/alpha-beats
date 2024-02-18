import { Divider, Theme, Typography } from "@mui/material";
import * as React from "react";

export default function Footer(props: { repoLink: string; theme: Theme }) {
    const { repoLink, theme } = props;
    return (
        <div>
            <Divider />
            <br />
            <footer>
                <Typography align="center">
                    Pusto T <br />
                    <a href={repoLink}>
                        <img
                            src={
                                "https://img.shields.io/badge/-@pustot-" +
                                (theme.palette.mode === "dark" ? "000000" : "ffffff") +
                                "?style=flat-square&logo=github&logoColor=" +
                                (theme.palette.mode === "dark" ? "white" : "black")
                            }
                        />
                    </a>
                </Typography>
            </footer>
            <br />
        </div>
    );
}