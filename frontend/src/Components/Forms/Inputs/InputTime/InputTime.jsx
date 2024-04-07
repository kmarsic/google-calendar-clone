/* eslint-disable react/prop-types */
import { InputTimeStart } from "./InputTimeStart";
import { InputTimeEnd } from "./InputTimeEnd";

export const InputTime = () => {
    return (
        <div className="input-shell">
                <div>
                    <div className="div-flex">
                            <InputTimeStart/>
                        <span>&#8212;</span>

                            <InputTimeEnd/>
                        <button className="btn" 
                        onClick={(e) => e.preventDefault()}>Add time</button>
                    </div>
                </div>
            </div>
    )
}

