/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { fileTypeImg } from "../../../Fncs/fileTypeImg";

export function InputAttachment () {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    function handleMultipleFiles(e) {
        const filesArray = Array.from(e.target.files)
        setUploadedFiles(prevFiles => [...prevFiles, ...filesArray])
    }
    function handleFileRemove(file) {
        const newList = uploadedFiles.filter((uploaded) => uploaded.name != file.name)
        setUploadedFiles(newList)
    }

    return (
        <>
            <div className="icons">
                <FontAwesomeIcon icon={faPaperclip} color="var(--text-body)" size="xl"/>
            </div>
            <div className="input-shell">
                <div className="attachment-grid">
                    {uploadedFiles.map((file, index) => {
                        return (
                            <div key={index} className="attachment">
                                <img src={fileTypeImg(file.type)} width="14px"/>
                                <span>{file.name.length > 10 ? file.name.substring(0,8) + "..." : file.name}</span>
                                <FontAwesomeIcon onClick={() => handleFileRemove(file)} icon={faXmark} size="lg" color="var(--text-body)" style={{cursor: "pointer"}}/>
                                <span className="full-name-hover">{file.name}</span>
                            </div>
                        )
                    })}
                </div>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <span style={{padding: "0.5rem"}}>Add attachment</span>
                    <input id="file-upload" className="text-input" type="file" multiple onChange={(e) => handleMultipleFiles(e)}/>
                </label>
            </div>
        </>        
    )
}
