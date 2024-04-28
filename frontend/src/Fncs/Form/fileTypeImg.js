import image from './../../styles/icons/img.png';
import pdf from './../../styles/icons/pdf.png';
import zip from './../../styles/icons/x-zip-compressed.png';
import xslx from './../../styles/icons/xslx.png';
import ppt from './../../styles/icons/ppt.png';
import word from './../../styles/icons/word.png';
import document from './../../styles/icons/document.png';

export const fileTypeImg = (type) => {
    if (type.includes("image")) return image 
    else if (type.includes("pdf")) return pdf
    else if (type.includes("zip")) return zip
    else if (type.includes("word")) return word
    else if (type.includes("presentation")) return ppt
    else if (type.includes("spreadsheet")) return xslx
    else return document
}