export const calcModalPosition = (clickedElement,setPosition) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const modalWidth = 448;
    const modalHeight = 462;
    const desiredLeft = clickedElement.data.clientX;
    const desiredTop = clickedElement.data.clientY;

    let adjustedLeft = desiredLeft;
    let adjustedTop = desiredTop;

    if (desiredLeft + modalWidth > viewportWidth) {
        adjustedLeft = viewportWidth - modalWidth;
    }

    if (desiredTop + modalHeight > viewportHeight) {
        adjustedTop = viewportHeight - modalHeight;
    }

    setPosition({ top: adjustedTop, left: adjustedLeft });
};

export const calcEditPosition = (event, setPosition, ref) => {
    if (ref.current.contains(event.target)) {
    const desiredLeft = event.clientX;
    const desiredTop = event.clientY;
    setPosition({ top: desiredTop, left: desiredLeft });
    } else return
};
