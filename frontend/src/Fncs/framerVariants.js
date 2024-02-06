export const calendarVariant = {
    hidden: {
      opacity: 0,
      x: "-70px",
      transition: {
        duration: 0.15
      }
    },
    visible : {
        x: 0,
        opacity: 1
    },
    hiddenNext: {
      opacity: 0,
      x: "70px",
      transition: {
        duration: 0.15
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

export const clickVariant = {
  click: {
    backgroundSize: ["30%", "60%", "90%", "100%"],
    backgroundColor: 'rgb(218, 220, 220)'
  }
}
