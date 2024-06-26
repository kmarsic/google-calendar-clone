export function RepeatFooter ({handleSubmit, onClose}) {

    return (
        <div className="div-flex" style={{marginTop: "30px", justifyContent: "right"}}>
            <button onClick={onClose} className="btn-big">Cancel</button>
            <button onClick={() => handleSubmit()} className="btn-main-transparent btn-big">Done</button>
        </div>
    )
}