/* eslint-disable react/prop-types */

export function MiniDay({date, iterator, previous, next}) {
    const parsedDate = Date.parse(date);
    return (
        <div 
        id={parsedDate} 
        className={previous || next ? "mini-box empty" : "mini-box"}>
            <span className='dayIndex'>{iterator}</span>
        </div>
    )
}