import MuiMarkdown from "mui-markdown";
import * as React from "react";

export default function MyMuiMarkdown(props: { markdown: string }) {
    const { markdown } = props;
    return (
        <MuiMarkdown
            options={{
                // cancel default slugify which removed all non-alphanumerical char
                slugify: str => str,
                overrides: {
                    h6: { props: { style: { scrollMarginTop: "50px" } } },
                    h5: { props: { style: { scrollMarginTop: "50px" } } },
                    h4: { props: { style: { scrollMarginTop: "50px" } } },
                    h3: {
                        props: {
                            style: { fontSize: 38, scrollMarginTop: "50px" },
                        },
                    },
                    h2: {
                        props: {
                            style: { fontSize: 46, scrollMarginTop: "50px" },
                        },
                    },
                    h1: {
                        props: {
                            style: { fontSize: 56, scrollMarginTop: "50px" },
                        },
                    },
                    img: {
                        props: {
                            style: { maxWidth: "100%" },
                        },
                    },
                },
            }}
        >
            {markdown}
        </MuiMarkdown>
    );
}
