/* eslint-disable react/prop-types */
export const Hamburger = ({ setBurger, burger }) => {
    const today = new Date().getDate();
    const imgref = () => `https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${today}_2x.png`;

    return (
        <div className="burger-title">
            <div
                onClick={(e) => {
                    e.target.classList.toggle("open");
                    burger ? setBurger(false) : setBurger(true);
                }}
                id="nav-icon"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <img
                    src={imgref()}
                    width={"40px"}
                    height={"40px"}
                    loading="lazy"
                    alt={today}
            />
            <p id="title">Calendar</p>
        </div>
    );
};
