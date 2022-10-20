import { resetLogin, getCookie } from '../Cookie';
import { Navigate } from 'react-router-dom';

const LogOut = () => {
    resetLogin();
    return (
        <>
            {window.location = "/Moderator"}
        </>
    );
}

export default LogOut;