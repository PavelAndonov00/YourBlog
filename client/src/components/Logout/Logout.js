import { useContext, useEffect } from 'react';


import Context from '../../contexts/context';

const Logout = ({
    history
}) => {
    let context = useContext(Context);

    useEffect(() => {
        localStorage.setItem("token", "");
        context.setToken({});

        localStorage.setItem("user", JSON.stringify({}));
        context.setUser({});

        context.setMessage("You have successfully logout!");
        history.push("/login");
    }, [])

    return (
        <>
            
        </>
    );
}

export default Logout;