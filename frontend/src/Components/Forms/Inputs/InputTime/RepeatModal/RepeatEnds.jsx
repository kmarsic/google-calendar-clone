export function RepeatEnds() {
    return (
        <div className="repeat-ends">
            <p style={{marginBottom: 18}}>Ends</p>
            <div className="div-flex">
                <div className="repeat-radio">
                    <div className="div-flex" style={{height: 35}}>
                        <input type="radio" name="state" id="Never" />
                        <label htmlFor="Never">Never</label>
                    </div>
                    <div className="div-flex" style={{height: 35}}>
                        <input type="radio" name="state" id="On" />
                        <label htmlFor="On">On</label>
                    </div>
                    <div className="div-flex" style={{height: 35}}>
                        <input type="radio" name="state" id="After" />
                        <label htmlFor="After">After</label>
                    </div>
                </div>
                <div className="repeat-ends-state">
                    <div className="repeat-option" style={{opacity: 0, userSelect: "none"}}>
                        <span className="bottom-border-animate padding">
                            Invisible
                        </span>
                    </div>
                    <div className="repeat-option">
                        <span className="bottom-border-animate padding">
                        Current Date
                        </span>
                    </div>
                    <div className="repeat-option">
                        <span className="bottom-border-animate padding">
                            <input type="number" id="repeat-occurrence"/>
                            occurences
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}