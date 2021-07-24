import React, { useRef, useState, useCallback, useMemo } from 'react';
import { openFileDialog, getListFiles, getAcceptTypeString } from './utils';
import { getErrorValidation } from './validation';
import {
    DEFAULT_NULL_INDEX,
    INIT_MAX_NUMBER,
    DEFAULT_DATA_URL_KEY,
} from './constants';

const ReactImageUploading = ({
    value = [],
    onChange,
    onError,
    children,
    dataURLKey = DEFAULT_DATA_URL_KEY,
    multiple = false,
    maxNumber = INIT_MAX_NUMBER,
    acceptType,
    maxFileSize,
    resolutionWidth,
    resolutionHeight,
    resolutionType,
}) => {
    const inValue = value || [];
    const inputRef = useRef(null);
    const [keyUpdate, setKeyUpdate] = useState(DEFAULT_NULL_INDEX);
    const [errors, setErrors] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleClickInput = useCallback(() => openFileDialog(inputRef), [
        inputRef,
    ]);

    const onImageUpload = useCallback(() => {
        setKeyUpdate(DEFAULT_NULL_INDEX);
        handleClickInput();
    }, [handleClickInput]);

    const onImageRemoveAll = useCallback(() => {
        onChange?.([]);
    }, [onChange]);

    const onImageRemove = (index) => {
        const updatedList = [...inValue];
        if (Array.isArray(index)) {
            index.forEach((i) => {
                updatedList.splice(i, 1);
            });
        } else {
            updatedList.splice(index, 1);
        }
        onChange?.(updatedList);
    };

    const onImageUpdate = (index) => {
        setKeyUpdate(index);
        handleClickInput();
    };

    const validate = async (fileList) => {
        const errorsValidation = await getErrorValidation({
            fileList,
            maxFileSize,
            maxNumber,
            acceptType,
            keyUpdate,
            resolutionType,
            resolutionWidth,
            resolutionHeight,
            value: inValue,
        });
        if (errorsValidation) {
            setErrors(errorsValidation);
            onError?.(errorsValidation, fileList);
            return false;
        }
        errors && setErrors(null);
        return true;
    };

    const handleChange = async (files) => {
        if (!files) return;
        const fileList = await getListFiles(files, dataURLKey);
        if (!fileList.length) return;
        const checkValidate = await validate(fileList);
        if (!checkValidate) return;
        let updatedFileList;
        const updatedIndexes = [];
        if (keyUpdate > DEFAULT_NULL_INDEX) {
            const [firstFile] = fileList;
            updatedFileList = [...inValue];
            updatedFileList[keyUpdate] = firstFile;
            updatedIndexes.push(keyUpdate);
        } else if (multiple) {
            updatedFileList = [...inValue, ...fileList];
            for (
                let i = inValue.length;
                i < updatedFileList.length;
                i += 1
            ) {
                updatedIndexes.push(i);
            }
        } else {
            updatedFileList = [fileList[0]];
            updatedIndexes.push(0);
        }
        onChange?.(updatedFileList, updatedIndexes);
    };

    const onInputChange = async (
        e
    ) => {
        await handleChange(e.target.files);
        keyUpdate > DEFAULT_NULL_INDEX && setKeyUpdate(DEFAULT_NULL_INDEX);
        if (inputRef.current) inputRef.current.value = '';
    };

    const acceptTypeString = useMemo(() => getAcceptTypeString(acceptType), [
        acceptType,
    ]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };

    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleChange(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    return (
        <>
            <input
                type="file"
                accept={acceptTypeString}
                ref={inputRef}
                multiple={multiple && keyUpdate === DEFAULT_NULL_INDEX}
                onChange={onInputChange}
                style={{ display: 'none' }}
            />
            {children?.({
                imageList: inValue,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                errors,
                dragProps: {
                    onDrop: handleDrop,
                    onDragEnter: handleDragIn,
                    onDragLeave: handleDragOut,
                    onDragOver: handleDrag,
                },
                isDragging,
            })}
        </>
    );
};

export default ReactImageUploading;