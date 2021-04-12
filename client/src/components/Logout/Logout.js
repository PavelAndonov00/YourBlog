import { useContext, useEffect } from 'react';


import Context from '../../contexts/context';

const Logout = ({
    history
}) => {
    let context = useContext(Context);

    useEffect(() => {
        localStorage.removeItem("user");
        history.push("/login");
        context.setMessage("You have successfully logout!");
    }, [])

    return (
        <>
            
        </>
    );
}

export default Logout;