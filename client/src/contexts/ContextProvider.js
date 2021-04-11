import Ctx from './context';
import {useState} from 'react';

const ContextProvider = ({children}) => {
    const [message, setMessage] = useState("");

    const onclickDelete = (ev) => {
        let doesAgree = window.confirm("Are you sure you want to delete?");
        if(!doesAgree) {
            ev.preventDefault();
        }
    };

    return (
        <Ctx.Provider value={{message, setMessage, onclickDelete}}>
            {children}
        </Ctx.Provider>
    );
};

export default ContextProvider;