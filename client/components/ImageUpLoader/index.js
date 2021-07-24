import { Button, CardMedia, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, Fragment } from "react";
import ImageUploading from "./ImageUploader";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: 200,
        height: 100,
        backgroundColor: "rgb(200,200,200)"
    },
    containerDrag: {
        opacity: 0.8
    },
    imageReview: {
        width: 200,
        height: 100,
        position: "absolute",
    }
}))

const ImageUpLoader = ({ onChange, defaultValue = "" }) => {

    const classes = useStyles()

    const [images, setImages] = useState(defaultValue ? [{ data_url: defaultValue }] : []);

    const onChangeImage = (imageList) => {
        setImages(imageList);
        onChange(imageList[0])
    };

    return (
        <ImageUploading
            multiple={false}
            value={images}
            onChange={onChangeImage}
            maxNumber={69}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                isDragging,
            }) => (
                <Button
                    className={`${classes.container} ${isDragging && classes.containerDrag}`}
                    onClick={onImageUpload}>
                    {
                        imageList[0] ?
                            <CardMedia className={classes.imageReview} image={imageList[0]["data_url"]} />
                            :
                            <Fragment />
                    }
                    <CloudUploadIcon />
                </Button>

            )}
        </ImageUploading>
    );
}

export default ImageUpLoader