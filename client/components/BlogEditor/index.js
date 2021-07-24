import React, { useRef } from 'react'
import dynamic from "next/dynamic";
import { Box, Button, Grid, Hidden, IconButton, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TagSelection from '../Tag/TagSelection'
import CategorySelection from '../Category/CategorySelection';
import config from './config'
import ImageUploader from '../ImageUpLoader'

const Editor = dynamic(() => import("jodit-react"), { ssr: false })

// xs: 0px
// sm: 600px
// md: 900px
// lg: 1200px
// xl: 1536px

const BlogEditor = ({ initial, onSave = (data) => { } }) => {

    let newBlog = useRef(initial ? initial : {
        title: "",
        author: "",
        content: "",
        desc: "",
        tags: "",
        categories: "",
        img_url: "",
        author: "60f4fd41a12bb9104e93ddc6"
    }).current

    const onChangeTag = (tags) => newBlog.tags = tags
    const onChangeCategory = (categories) => newBlog.categories = categories
    const onChangeContent = content => newBlog.content = content
    const onChangeDesc = event => newBlog.desc = event.target.value
    const onChangeTitle = event => newBlog.title = event.target.value
    const onChangeImage = (image) => newBlog.img_url = image.data_url
    const onSaveClick = () => onSave(newBlog)

    return (
        <Grid container>
            <Hidden smDown>
                <Grid item xs={12} sm={false} md={3}  >
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={8} md={6} >
                <Box width={"100%"} pt={1} pb={1}>
                    <TextField
                        id="title"
                        label="Title"
                        style={{ width: "100%" }}
                        onChange={onChangeTitle}
                        defaultValue={newBlog.title}
                    />
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <TextField
                        id="desc"
                        label="Describe"
                        style={{ width: "100%" }}
                        onChange={onChangeDesc}
                        defaultValue={newBlog.desc}
                    />
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <TagSelection
                        onChange={onChangeTag}
                        defaultValue={newBlog.tags}
                    />
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <CategorySelection
                        onChange={onChangeCategory}
                        defaultValue={newBlog.categories}
                    />
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <ImageUploader
                        onChange={onChangeImage}
                        defaultValue={newBlog.img_url}
                    />
                </Box>
                <Box width={"100%"}>
                    <Editor
                        value={newBlog.content}
                        config={config}
                        tabIndex={1}
                        onBlur={onChangeContent}
                        onChange={onChangeContent}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
                <Box width={"100%"} pt={1} pb={1}>
                    <Button
                        onClick={onSaveClick}
                        variant="contained"
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <IconButton>
                    </IconButton>
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <IconButton>
                    </IconButton>
                </Box>
            </Grid>
        </Grid>
    )
}

export default BlogEditor