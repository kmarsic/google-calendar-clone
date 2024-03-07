/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export function InputGuests({handleGuestChange}) {
    const [email, setEmail] = useState("");
    const [guestList, setGuestList] = useState([]);
    const [error, setError] = useState(false);
    const [focus, setFocus] = useState(false)

    useEffect(() => {
        handleGuestChange(guestList)
    }, [guestList])

    const handleRemoveGuest = (removedGuest) => {
        const newList = guestList.filter(guest => guest !== removedGuest);
        setGuestList(newList)
    }

    const emailValidation = () => {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (regEx.test(email)) {
            
          return true
        } else if (!regEx.test(email) && email !== "") {
            return false
        }
    }

    const handleAddGuest = (e) => {
        e.preventDefault();
        if (emailValidation()) {
        setGuestList([...guestList, email]);
        setEmail("");
        } else {
            setError(true);
            setFocus(true);
        }
    }
    
    const handleOnChange = (e) => {
        setEmail(e.target.value);
    }
    return (
        <div className="input-shell">
            <span className={error ? "bottom-border-error" : "bottom-border-animate"}>
                <input
                    className="text-input"
                    autoFocus
                    type="email"
                    name="guests"
                    value={email}
                    placeholder="Add guests"
                    autoComplete="off"
                    onChange={(e) => {handleOnChange(e); setError(false)}}
                    onKeyDown={(e) => e.key === "Enter" ? handleAddGuest(e) : null}
                    onBlur={() => setFocus(false)}
                />
                <input type="submit" hidden />
            </span>

            {emailValidation() ? 
            <EmailValid email={email} handleAddGuest={handleAddGuest}/> : null
            }

            {error && focus ? <EmailInvalid/> : null}

            {guestList[0] ? 
            <div className="guest-list">
                <div>
                    {guestList.map((guest, index) =>
                        <div className="guest-list-items" key={index}>
                            <div>
                                <img style={{borderRadius: "1rem"}} src="https://lh3.googleusercontent.com/a/default-user=s28-p" alt="profile" />
                                <span>{guest}</span>
                            </div>
                            <FontAwesomeIcon className="btn-round" icon={faXmark} size="lg" onClick={() => handleRemoveGuest(guest) }/>
                        </div>
                    )}
                </div>
            </div> : null}
        </div>
    )
}

function EmailValid ({email, handleAddGuest}) {
    return (
        <div className="email-valid">
                {
                <div onClick={(e) => handleAddGuest(e)}>
                    <img style={{borderRadius: "1rem"}} src="https://lh3.googleusercontent.com/a/default-user=s28-p" alt="profile" />
                    <span>{email}</span>
                </div>
                    }
        </div>
    )
}

function EmailInvalid () {
    return (
        <div className="email-invalid">
            Invalid email address
        </div>
    )
}