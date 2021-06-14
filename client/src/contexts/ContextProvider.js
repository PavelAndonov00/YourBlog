import Ctx from './context';
import { useState } from 'react';

const ContextProvider = ({ children }) => {
    const [message, setMessage] = useState("");

    return (
        <Ctx.Provider value={{ message, setMessage}}>
            {children}
        </Ctx.Provider>
    );
};

export default ContextProvider;