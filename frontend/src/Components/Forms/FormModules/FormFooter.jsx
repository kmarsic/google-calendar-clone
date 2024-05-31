/* eslint-disable react/prop-types */
export function FormFooter({bottomBorder, handleSubmit}) {
    return (
        <div className={bottomBorder ? "div-flex form-footer form-border" : "div-flex form-footer"}>
            <button className="btn-big" onClick={(e) => {e.preventDefault()}}>
                <span>More options</span>
            </button>
            <input className="btn-big btn-main" type="submit" form="my-form" value="Save"/>
        </div>
    )
}