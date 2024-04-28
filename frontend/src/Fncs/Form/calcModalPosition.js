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
