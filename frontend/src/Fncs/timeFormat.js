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

export function formTimeFormat(date) {
    console.log(date)
    return (
        date.toLocaleString("default", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    )
}