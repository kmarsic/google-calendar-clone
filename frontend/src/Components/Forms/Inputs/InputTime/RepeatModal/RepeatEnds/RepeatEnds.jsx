import { useState } from "react";
import { RepeatEndsOn } from "./RepeatEndsOn";
import { RepeatEndsOnOccurence } from "./RepeatEndsOnOccurence";

export function RepeatEnds() {
    const [activeRadio, setActiveRadio] = useState("Never")
    return (
        <div className="repeat-ends">
            <p style={{marginBottom: 18}}>Ends</p>
            <div className="div-flex">
                <div className="repeat-radio">
                    <div className="div-flex" style={{height: 35}}>
                        <input type="radio" defaultChecked name="state" value={"Never"} onChange={(e) => setActiveRadio(e.target.value)} />
                        <label htmlFor="Never">Never</label>
                    </div>
                    <div className="div-flex" style={{height: 35}}>
                        <input type="radio" name="state" value={"On"} onChange={(e) => setActiveRadio(e.target.value)}  />
                        <label htmlFor="On">On</label>
                    </div>
                    <div className="div-flex" style={{height: 35}}>
                        <input type="radio" name="state" value={"After"} onChange={(e) => setActiveRadio(e.target.value)} />
                        <label htmlFor="After">After</label>
                    </div>
                </div>
                <div className="repeat-ends-state">
                    <div className="repeat-option" style={{opacity: 0, userSelect: "none"}}>
                        <span className="bottom-border-animate padding">
                            whoosh
                        </span>
                    </div>
                    <RepeatEndsOn active={activeRadio}/>
                    <RepeatEndsOnOccurence active={activeRadio}/>
                </div>
            </div>
        </div>
    )
}