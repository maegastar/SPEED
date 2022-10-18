import { resetLogin, getCookie } from '../Cookie';
import { Navigate } from 'react-router-dom';

const LogOut = () => {
    console.log(getCookie('login'));
    resetLogin();
    return <Navigate to='/' />;
}

export default LogOut;