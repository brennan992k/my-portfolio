import { Paper, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCategories, useCategories } from "../../redux/features/categories"
import ChipSelection from "../Selection/ChipSelection"



const CategorySelection = ({ initial, onChange = (data) => { }, defaultValue = [] }) => {

    const state = useCategories()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCategories(initial))
    }, [initial])

    return (
        <Paper >
            <Typography >Categories</Typography>
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

export default CategorySelection