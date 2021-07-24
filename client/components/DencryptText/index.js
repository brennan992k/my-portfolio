import React, { memo, useEffect } from "react";
import { Typography } from "@material-ui/core"
import useDencrypt from "./useDencrypt";

const decryptOptions = {
    chars: [
        "-",
        ".",
        "/",
        "*",
        "!",
        "?",
        "#",
        "%",
        "&",
        "@",
        "$",
        "€",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "<",
        ">",
        "~",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ],
    interval: 100,
};

const DecryptText = (props) => {
    const { result, dencrypt } = useDencrypt(decryptOptions);

    useEffect(() => {
        const updateText = () => {
            dencrypt(props.text || "");
        };

        const action = setTimeout(updateText, 1000);

        return () => clearTimeout(action);
    }, [dencrypt, props.text]);

    return (
        <Typography {...props}>
            {result}
            {" "}
        </Typography>
    );
};

export default memo(DecryptText)