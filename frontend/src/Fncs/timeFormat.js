export function titleTimeFormat (view, date) {
    function checkDate() {
        const day = date.getDay()
        const firstOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
        const dayRule = firstOfWeek.getDate() + 6;
        const nextMonth = new Date(firstOfWeek.getFullYear(), firstOfWeek.getMonth() + 1, 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        if (dayRule > lastDay) {
            if (date.getFullYear() < nextMonth.getFullYear()){
                return (
                    firstOfWeek.toLocaleString("default", {
                    month: "short",
                    year: "numeric"
                    }) + " - " +
                    nextMonth.toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                    })
                )
            } else {
                return (
                    firstOfWeek.toLocaleString("default", {
                        month: "short",
                    }) + " - " +
                    nextMonth.toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                    })
                )
            }
        } else {
            return (firstOfWeek.toLocaleString("default", {
                month: "long",
                year: "numeric",
            }))
        }
    } 
    switch(view){
        case "Year":
            return (
                date.toLocaleString("default", {
                    year: "numeric"
                }));
        case "Month":
            return (
                date.toLocaleString("default", {
                month: "long",
                year: "numeric",
                })
            )
        case "Week":
            return checkDate();
        case "Day":
            return (
                date.toLocaleString("default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })
            )
    }
}

export function inputTimeFormat(date) {
    const currYear = new Date().getFullYear();
    const currDate = new Date(date)
    if (currYear != currDate.getFullYear()) {
    return (
        currDate.toLocaleString("default", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    )
    } else {
        return (
            currDate.toLocaleString("default", {
                weekday: "long",
                month: "long",
                day: "numeric",
            })
        )
    }
}

export function startDateMatch(startDate, endDate) {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    if (newStartDate.getFullYear() == newEndDate.getFullYear() && newStartDate.getMonth() > newEndDate.getMonth()) {
        return newStartDate;
    } else if (newStartDate.getFullYear() > newEndDate.getFullYear()) {
        return newStartDate;
    } else if (newStartDate.getFullYear() == newEndDate.getFullYear()
    && newStartDate.getMonth() == newEndDate.getMonth() 
    && newStartDate.getDate() > newEndDate.getDate() ) {
        return newStartDate;
    } else return newEndDate;
}

export function endDateMatch(endDate, startDate) {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    if (newEndDate.getFullYear() == newStartDate.getFullYear() && newEndDate.getMonth() < newStartDate.getMonth()) {
        return newEndDate;
    } else if (newEndDate.getFullYear() < newStartDate.getFullYear()) {
        return newEndDate;
    } else if (newStartDate.getFullYear() == newEndDate.getFullYear()
    && newEndDate.getMonth() == newStartDate.getMonth() 
    && newEndDate.getDate() < newStartDate.getDate()
    ) {
        return newEndDate;
    } else return newStartDate;
}