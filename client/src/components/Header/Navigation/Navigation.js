import { NavLink } from 'react-router-dom';

import './Navigation.css';
import UserProfile from '../UserProfile';

const Navigation = () => {
    return (
        <ul className="header-navigation-list">
            <li className="header-navigation-list-item">
                <NavLink className="header-navigation-list-item-a"
                    to="/login"
                    exact>
                    Login
                    </NavLink>
            </li>
            <li className="header-navigation-list-item">
                <NavLink className="header-navigation-list-item-a"
                    to="/register"
                    exact>
                    Register
                    </NavLink>
            </li>
        </ul>
    );
}

export default Navigation;