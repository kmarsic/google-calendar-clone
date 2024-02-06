/* eslint-disable react/prop-types */
export function InputTime({formData, handleInputChange}) {
    return (
        <div className="input-shell">
            <div className="form-time">
                <div className="div-flex">
                    <input 
                    type="text" 
                    className="text-input" 
                    value={formData.startTime}
                    autoComplete="off"
                    name="startTime"
                    onChange={(e) => handleInputChange(e)}/>

                    <span>&#8212;</span>

                    <input 
                    type="text" 
                    className="text-input" 
                    value={formData.endTime} 
                    autoComplete="off"
                    name="endTime"
                    onChange={(e) => handleInputChange(e)}/>
                    <button className="btn" onClick={(e) => e.preventDefault()}>Add time</button>
                </div>
            </div>
        </div>
    )
}