import Ctx from './context';
import {useState} from 'react';

const ContextProvider = ({children}) => {
    const [message, setMessage] = useState("");

    const onclickDelete = (ev) => {
        let doesAgree = window.confirm("Are you sure you want to delete?");
        if(!doesAgree) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    };

    const stopPropagationHandler = (ev) => {
        ev.stopPropagation();
    }

    return (
        <Ctx.Provider value={{message, setMessage, onclickDelete, stopPropagationHandler}}>
            {children}
        </Ctx.Provider>
    );
};

export default ContextProvider;