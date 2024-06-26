export const currentDayOccurrence = (formData) => {
    const dayIndex = new Date(formData.startDate).getDay();
    const day = new Date(formData.startDate).getDate();
    const year = new Date(formData.startDate).getFullYear();
    const month = new Date(formData.startDate).getMonth();
    const monthDays = new Date(year, month + 1, 0).getDate();

    const orderedNumbers = ["first", "second", "third", "fourth", "fifth"]
    let count = 0;

    for (let i = 0; i < monthDays; i++) {
        const iteration = new Date(year, month, i);
        if (iteration.getDay() === dayIndex) {
            count++;
            if (iteration.getDate() === day) break;
        }
    }
    return orderedNumbers[count - 1];
}