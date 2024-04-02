import { useContext, useEffect, useRef, useState } from "react"
import { EventChangeContext, EventDataContext } from "../formContext"
import { BtnBold, BtnItalic, BtnClearFormatting, BtnLink, BtnNumberedList, BtnBulletList, BtnUnderline, Editor, EditorProvider, Toolbar, Separator} from 'react-simple-wysiwyg';

/* eslint-disable react/prop-types */
export function InputDescription() {
    const formData = useContext(EventDataContext);
    const dispatchReducer = useContext(EventChangeContext);
    const handleDescriptionChange = (e) => {
        dispatchReducer({type: "description", payload: e.target.value})
    }
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth)
        }
    }, [])
    return (
        <div className="input-shell">
                <span className="bottom-border-animate" ref={ref}>
                    <EditorProvider>
                        <Editor
                        className="text-input" 
                        value={formData.description} 
                        onChange={handleDescriptionChange}
                        containerProps={{style: { minHeight: '70px', maxWidth: width}}}>
                            <Toolbar>
                                <BtnBold/>
                                <BtnItalic/>
                                <BtnUnderline/>
                                <Separator/>
                                <BtnNumberedList/>
                                <BtnBulletList/>
                                <Separator/>
                                <BtnLink/>
                                <BtnClearFormatting/>
                            </Toolbar>
                        </Editor>
                    </EditorProvider>
                </span>
        </div>
    )
}