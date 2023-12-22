export function titleTimeFormat (view, date) {
    function checkDate() {
        const dayRule = date.getDate() + 7;
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        if (dayRule > lastDay) {
            if (date.getFullYear() < nextMonth.getFullYear()){
                return (
                    date.toLocaleString("default", {
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
                    date.toLocaleString("default", {
                        month: "short",
                    }) + " - " +
                    nextMonth.toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                    })
                )
            }
        } else {
            return (date.toLocaleString("default", {
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