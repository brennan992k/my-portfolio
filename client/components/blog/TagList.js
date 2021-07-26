import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button, Typography } from "@material-ui/core"
import { LocalOffer as LocalOfferIcon } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import { useTags, fetchMoreTags } from "../../redux/features/tags"
import { setLoading, fetchMoreArticles, getArticles, setParams } from "../../redux/features/articles"
import Section from "../Section"
import store from "../../redux/store"

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

const TagList = () => {

    const state = useTags()
    const dispatch = useDispatch()
    const onFetchArticle = async (tid) => {
        await dispatch(setLoading(true))
        await dispatch(setParams({ tid, page: 0 }))
        const currentState = getArticles(store)
        await dispatch(fetchMoreArticles(currentState))
        await dispatch(setLoading(false))
    }

    useEffect(() => {
        dispatch(fetchMoreTags(state))
    }, [])

    return (
        <Section>
            <Typography ><LocalOfferIcon /> Tags</Typography>
            {
                state.items.map((item) => (
                    <Button key={item._id} onClick={() => onFetchArticle(item._id)}>
                        <Typography
                            component={"span"}
                            style={{
                                color: `rgb(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)} )`,
                                fontSize: Math.floor(Math.random() * 15 + 15) + 'px'
                            }}>
                            {item.name}
                        </Typography>
                    </Button>
                ))
            }
        </Section>
    )


}

export default TagList