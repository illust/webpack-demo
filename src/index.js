import "./style.scss"
const getFilesName = (fileArray) => {
    return Object.values(fileArray)
}

const fileArr = {"file-a":"apple","file-b":"orange","file-c":"watermelon"}

console.log(getFilesName(fileArr));