import { RepeatNumberInput } from "./RepeatNumberInput";
import { RepeatUnit } from "./RepeatUnit";

export function RepeatEvery() {
    return(
        <div className="repeat-every">
            <p>Repeat every</p>
            <RepeatNumberInput/>
            <RepeatUnit/>
        </div>
    )
}