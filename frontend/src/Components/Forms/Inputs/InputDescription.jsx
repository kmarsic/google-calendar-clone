import { useEffect, useRef, useState } from "react"
import { BtnBold, BtnItalic, BtnClearFormatting, BtnLink, BtnNumberedList, BtnBulletList, BtnUnderline, Editor, EditorProvider, Toolbar, Separator} from 'react-simple-wysiwyg';
import { useDispatch, useSelector } from "react-redux";
import { formData, handleFormInputs } from "../../../redux/features/formSlicer";

/* eslint-disable react/prop-types */
export function InputDescription() {
    const form = useSelector(formData);
    const dispatch = useDispatch();

    const handleDescriptionChange = (e) => {
        dispatch(handleFormInputs({type: "description", payload: e.target.value}));
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
                        value={form.description} 
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