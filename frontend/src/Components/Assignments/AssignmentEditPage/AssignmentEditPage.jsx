import { createPortal } from "react-dom";
import { AssignmentInputTitle } from "./AssignmentInputTitle";

export function AssignmentEditPage({data}) {
    return createPortal(
        <>
        <AssignmentInputTitle data={data}/>
        <div className="div-flex">
            <div>
            </div>
            <div>
            </div>
        </div>
        </>, document.body
    )
}