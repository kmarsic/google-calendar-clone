import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { currentDate } from "./redux/features/dateSlicer";


export function TitleTab() {
    const date = new Date(useSelector(currentDate));
    const today = new Date().getDate();

    const faviconHref = (num) => `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${num}.ico`;

    return (
        <Helmet>
                <title>
                    Google Calendar -{" "}
                    {date.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </title>
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={faviconHref(today)}
                ></link>
            </Helmet>
    )
}