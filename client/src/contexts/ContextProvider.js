import Ctx from './context';
import {useState} from 'react';

const ContextProvider = ({children}) => {
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    return (
        <Ctx.Provider value={{message, setMessage, token, setToken, user, setUser}}>
            {children}
        </Ctx.Provider>
    );
};

export default ContextProvider;