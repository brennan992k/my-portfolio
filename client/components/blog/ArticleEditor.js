import React, { useRef } from 'react'
import dynamic from "next/dynamic";
import { Box, Button, Grid, Hidden, IconButton, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TagSelection from '../Tag/TagSelection'
import CategorySelection from '../Category/CategorySelection';
import ImageUploader from '../ImageUpLoader'
import { uploadURI } from '../../api/config'

const Editor = dynamic(() => import("jodit-react"), { ssr: false })

const ArticleEditor = ({ initial, onSave = (data) => { } }) => {

    let newArticle = useRef(initial ? initial : {
        title: "",
        author: "",
        content: "",
        desc: "",
        tags: "",
        categories: "",
        img_url: "",
        author: "60f4fd41a12bb9104e93ddc6"
    }).current

    const onChangeTag = (tags) => newArticle.tags = tags
    const onChangeCategory = (categories) => newArticle.categories = categories
    const onChangeContent = content => newArticle.content = content
    const onChangeDesc = event => newArticle.desc = event.target.value
    const onChangeTitle = event => newArticle.title = event.target.value
    const onChangeImage = (image) => newArticle.img_url = image.data_url
    const onSaveClick = () => onSave(newArticle)

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
                        defaultValue={newArticle.title}
                    />
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <TextField
                        id="desc"
                        label="Describe"
                        style={{ width: "100%" }}
                        onChange={onChangeDesc}
                        defaultValue={newArticle.desc}
                    />
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <TagSelection
                        onChange={onChangeTag}
                        defaultValue={newArticle.tags}
                    />
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <CategorySelection
                        onChange={onChangeCategory}
                        defaultValue={newArticle.categories}
                    />
                </Box>
                <Box width={"100%"} pt={1} pb={1}>
                    <ImageUploader
                        onChange={onChangeImage}
                        defaultValue={newArticle.img_url}
                    />
                </Box>
                <Box width={"100%"}>
                    <Editor
                        value={newArticle.content}
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

export default ArticleEditor

const config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 500,
    direction: 'ltr',
    language: 'en',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: 'P',
    useSplitMode: false,
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 100,
    disablePlugins: ['paste', 'stat'],
    events: {},
    textIcons: false,
    uploader: {
        url: uploadURI,
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
        filesVariableName: function (t) {
            return 'files[' + t + ']';
        }, 
        withCredentials: false,
        pathVariableName: 'path',
        format: 'json',
        method: 'POST',
    },
    filebrowser: {
        ajax: {
            url: "/api/file/files",
        },
        uploader: {
            url: uploadURI
        },
    },
    placeholder: 'Writing...',
    showXPathInStatusbar: false
}