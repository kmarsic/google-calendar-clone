export const findFirstDay = (y, m) => {
    return new Date(y, m, 1).getDay();
};