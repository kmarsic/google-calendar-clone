export const calcModalPosition = (clickedElement,setPosition, view) => {
    const container = clickedElement.data.target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const modalWidth = 448;
    const initialHeight = 481;
    const maxModalHeight = 610;
    let adjustedLeft;
    let adjustedTop;
    if (view === "Day") {
        adjustedLeft = container.width / 2;
        adjustedTop = 270;
    } else {
        if (viewportWidth >= 1200 && viewportHeight > 900) {
            //adjust X position based on container
            if (container.left > 470) {
                adjustedLeft = container.left - modalWidth - 40;
            } else {
                adjustedLeft = container.left + container.width + 8;
            }
            //adjust Y position based on viewport and the container
            if (container.top > 650) {
                adjustedTop = container.top - initialHeight + 27
            } else if (container.top < 100) {
                adjustedTop = 90 + 27
            } else {
                adjustedTop = 180;
            }
        // spawn around the center if viewport is smaller
        } else if (viewportWidth < 1200 && viewportWidth >= 600) {
            adjustedLeft = viewportWidth / 5 + 100;
            adjustedTop = 270;
        }
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
