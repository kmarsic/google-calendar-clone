export function calcTime(e,view) {
    const cursorLeft = e.clientX;
    const cursorTop = e.clientY;
    const startCalc = calendarRef.current.offsetTop + 89;
    const quarterFragment = 12;
    const result = (cursorTop - startCalc) / quarterFragment;
}