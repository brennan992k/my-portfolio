import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        listStyle: 'none',
        padding: theme.spacing(1),
        margin: 0,
        flexDirection:"column",
    },
}));

const Selection = ({ defaultValue = [], fieldCheck = "key", data = [], onChange = (data = []) => { }, mutilable = true, renderItem, className }) => {
    const classes = useStyles();
    const [values, setValues] = useState(defaultValue)

    const onSelection = async (data) => {
        let newValues = [];
        if (mutilable) {
            if (values.indexOf(data) > -1) {
                newValues = await values.filter(i => i != data)
            } else {
                newValues = [...values, data]
            }
        } else {
            newValues = [data]
        }
        setValues(newValues)
        onChange(newValues)
    }

    return (
        <Box component="ul" className={`${classes.root} ${className}`}>
            {data.map((item) => {
                return (
                    <li key={item[fieldCheck]}>
                        {renderItem({
                            item,
                            onClick: () => onSelection(item[fieldCheck]),
                            isSelected: values.indexOf(item[fieldCheck]) > -1
                        })}
                    </li>
                );
            })}
        </Box>
    );
}

export default Selection