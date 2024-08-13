import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { currentDate, currentView } from "./redux/features/dateSlicer";


export function TitleTab() {
    const date = new Date(useSelector(currentDate));
    const today = new Date().getDate();
    const view = useSelector(currentView);

    const faviconHref = (num) => `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${num}.ico`;

    const determineTitle = () => {
        switch (view) {
            case "Year":
                return (
                    `${date.toLocaleString("default", {
                        year: "numeric",
                    })} year`
                )
            case "Month":
                return (
                    date.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })
                );
            case "Week":
                const firstOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
                return (
                    `Week of ${firstOfWeek.toLocaleString("default", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}`
                );
            case "Day":
                return (
                    date.toLocaleString("default", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })
                )
        }
    }

    return (
        <Helmet>
                <title>
                    {`Google Calendar - ${determineTitle()}`}
                </title>
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={faviconHref(today)}
                ></link>
            </Helmet>
    )
}