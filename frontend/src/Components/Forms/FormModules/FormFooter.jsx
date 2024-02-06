export function FormFooter() {
    return (
        <div className="div-flex form-footer">
            <button onClick={(e) => e.preventDefault()}>
                <span>More options</span>
            </button>
            <button type="submit">
                <span>Save</span>
            </button>
        </div>
    )
}