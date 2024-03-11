import { useContext } from "react"
import { EventChangeContext, EventDataContext } from "../formContext"
import { BtnBold, BtnItalic, BtnClearFormatting, BtnLink, BtnNumberedList, BtnBulletList, BtnUnderline, Editor, EditorProvider, Toolbar, Separator} from 'react-simple-wysiwyg';

/* eslint-disable react/prop-types */
export function InputDescription() {
    const formData = useContext(EventDataContext);
    const dispatchReducer = useContext(EventChangeContext);
    const handleDescriptionChange = (e) => {
        dispatchReducer({type: "description", payload: e.target.value})
    }
    return (
        <div className="input-shell">
                <span className="bottom-border-animate">
                    <EditorProvider>
                        <Editor className="text-input" value={formData.description} onChange={handleDescriptionChange}>
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