import { uploadURI } from '../../api/config'

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

export default config