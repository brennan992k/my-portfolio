import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(1),
        margin: 0,
    },
    chip: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

const ChipSelection = ({ defaultValue = [], fieldCheck = "key", fieldLabel = "label", data = [], onChange = (data = []) => { }, mutilable = true }) => {
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
        <Box component="ul" className={classes.root}>
            {data.map((item) => {
                return (
                    <li key={item[fieldCheck]}>
                        <Chip
                            label={item[fieldLabel]}
                            onClick={() => onSelection(item[fieldCheck])}
                            className={classes.chip}
                            color={values.indexOf(item[fieldCheck]) > -1 ? "primary" : "default"}
                        />
                    </li>
                );
            })}
        </Box>
    );
}

export default ChipSelection