/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import icon from './../../../styles/icons/document.png';

export function InputAttachment () {
    const [files, setFiles] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    function handleMultipleChange(e) {
        const filesArray = Array.from(e.target.files)
        setFiles(filesArray);
        setUploadedFiles(prevFiles => [...prevFiles, ...filesArray])
    }

    return (
        <>
            <div className="icons">
                <FontAwesomeIcon icon={faPaperclip} color="var(--text-body)" size="xl"/>
            </div>
            <div className="input-shell">
                <input className="text-input" type="file" multiple onChange={(e) => handleMultipleChange(e)}/>
                <div className="attachment-grid">
                    {uploadedFiles.map((file, index) => {
                        return (
                            <div key={index} className="attachment">
                                <img src={icon} width="14px"/>
                                <span>{file.name.substring(0,10)}</span>
                                <FontAwesomeIcon icon={faXmark} size="xl"/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>        
    )
}
