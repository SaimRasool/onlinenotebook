import React, { useState }from 'react'
import AlertContext from './alertContext';

const alertState = (props) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500)
    }
  return (
      <AlertContext.Provider value={{ alert,showAlert }}>
          {props.children}
      </AlertContext.Provider>
  )
}

export default alertState
