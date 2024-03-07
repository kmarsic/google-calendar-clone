export function FormFooter() {
    return (
        <div className="div-flex form-footer">
            <button className="btn-big" onClick={(e) => e.preventDefault()}>
                <span>More options</span>
            </button>
            <button className="btn-big btn-main" type="submit">
                <span>Save</span>
            </button>
        </div>
    )
}