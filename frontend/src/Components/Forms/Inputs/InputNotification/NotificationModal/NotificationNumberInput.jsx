export function NumberInput({setState, state}) {
  const errorMessages = {
    days: "Must be between 0 and 28 days",
    weeks: "Must be between 0 and 4 weeks",
    minutes: "Must be between 0 and 40320 minutes",
    hours: "Must be between 0 and 672 hours",
  };

  return (
    <div className="notification-modal-option">
      <span
        className={
          state.error
            ? "bottom-border-error padding"
            : "bottom-border-animate padding"
        }
      >
        <input
          id="notification-number"
          min={0}
          type="number"
          value={state.duration}
          onChange={(e) => {
            setState({type: "duration", payload: e.target.value });
            setState({type: "error"})
          }}
        />
      </span>
      {state.error ? (
        <span className="box-hover">
          {errorMessages[state.unit]}
        </span>
      ) : null}
    </div>
  );
}
