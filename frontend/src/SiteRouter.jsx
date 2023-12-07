import { useRoutes } from "react-router-dom";
import { MonthView } from "./Components/CalendarViews/MonthView/MonthView";
import { YearView } from "./Components/CalendarViews/Year/YearView";
import { WeekView } from "./Components/CalendarViews/week/WeekView";
import { DayView } from "./Components/CalendarViews/day/DayView";

export function SiteRouter() {   
    let calendarRoutes = useRoutes([
        {
            path: "/",
            element: <MonthView/>
        },
        {
            path: "/month",
            element: <MonthView/>,
            children: 
                [{
                    path: ":yearId",
                    element: <MonthView/>,
                    children: [{
                        path: ":monthId",
                        element: <MonthView/>,
                        children: [
                            {
                                path: ":dayId",
                                element: <MonthView/>
                            }
                        ]
                    }]
                }]
            
        },
        {
            path: "/year",
            element: <YearView/>,
            children: 
                [{
                    path: ":yearId",
                    element: <YearView/>,
                    children: [{
                        path: ":monthId",
                        element: <YearView/>,
                        children: [
                            {
                                path: ":dayId",
                                element: <YearView/>
                            }
                        ]
                    }]
                }]
            
        },
        {
            path: "/week",
            element: <WeekView/>,
            children: 
                [{
                    path: ":yearId",
                    element: <WeekView/>,
                    children: [{
                        path: ":monthId",
                        element: <WeekView/>,
                        children: [
                            {
                                path: ":dayId",
                                element: <WeekView/>
                            }
                        ]
                    }]
                }]
            
        },
        {
            path: "/day",
            element: <DayView/>,
            children: 
                [{
                    path: ":yearId",
                    element: <DayView/>,
                    children: [{
                        path: ":monthId",
                        element: <DayView/>,
                        children: [
                            {
                                path: ":dayId",
                                element: <DayView/>
                            }
                        ]

                    }]
                }]
            
        },
        {
            path: "*",
            element: <MonthView/>
        }

    ])

    return calendarRoutes
}