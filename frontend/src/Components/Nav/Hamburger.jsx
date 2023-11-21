/* eslint-disable react/prop-types */
export const Hamburger = ({setBurger, burger}) => {

    return (
        <div onClick={(e) => {
            e.target.classList.toggle('open');
            burger ? setBurger(false) : setBurger(true);
        }}
        id="nav-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>


    )
}