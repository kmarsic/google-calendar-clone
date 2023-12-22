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
            path: "/Month",
            element: <MonthView/>,
            children: 
                [{
                    path: ":YearId",
                    element: <MonthView/>,
                    children: [{
                        path: ":MonthId",
                        element: <MonthView/>,
                        children: [
                            {
                                path: ":DayId",
                                element: <MonthView/>
                            }
                        ]
                    }]
                }]
            
        },
        {
            path: "/Year",
            element: <YearView/>,
            children: 
                [{
                    path: ":YearId",
                    element: <YearView/>,
                    children: [{
                        path: ":MonthId",
                        element: <YearView/>,
                        children: [
                            {
                                path: ":DayId",
                                element: <YearView/>
                            }
                        ]
                    }]
                }]
            
        },
        {
            path: "/Week",
            element: <WeekView/>,
            children: 
                [{
                    path: ":YearId",
                    element: <WeekView/>,
                    children: [{
                        path: ":MonthId",
                        element: <WeekView/>,
                        children: [
                            {
                                path: ":DayId",
                                element: <WeekView/>
                            }
                        ]
                    }]
                }]
            
        },
        {
            path: "/Day",
            element: <DayView/>,
            children: 
                [{
                    path: ":YearId",
                    element: <DayView/>,
                    children: [{
                        path: ":MonthId",
                        element: <DayView/>,
                        children: [
                            {
                                path: ":DayId",
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