import { Paper, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setTags, useTags } from "../../redux/features/tags"
import ChipSelection from "../Selection/ChipSelection"



const TagSelection = ({ initial, onChange = (data) => { }, defaultValue = [] }) => {

    const state = useTags()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTags(initial))
    }, [initial])

    return (
        <Paper >
            <Typography >Tags</Typography>
            <ChipSelection
                data={state.items}
                fieldCheck={"_id"}
                fieldLabel={"name"}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </Paper>
    )


}

export default TagSelection