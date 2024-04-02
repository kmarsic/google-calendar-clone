/* eslint-disable react/prop-types */
export function FormFooter({bottomBorder}) {
    return (
        <div className={bottomBorder ? "div-flex form-footer form-border" : "div-flex form-footer"}>
            <button className="btn-big" onClick={(e) => e.preventDefault()}>
                <span>More options</span>
            </button>
            <button className="btn-big btn-main" type="submit">
                <span>Save</span>
            </button>
        </div>
    )
}