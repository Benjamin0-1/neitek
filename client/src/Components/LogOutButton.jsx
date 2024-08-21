import React from "react";
import { useNavigate } from 'react-router-dom'; 
import LogOutIcon from '@mui/icons-material/Logout';


function LogOutButton() {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <button
            className="logout-button"
            onClick={handleLogout}
            style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
            }}

        >
            <LogOutIcon onClick={handleLogout} style={{ cursor: 'pointer' }} />
        </button>
    );
}

export default LogOutButton;
