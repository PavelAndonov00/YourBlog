import { NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
    return (
        <ul className="header-navigation-list">
            <li className="header-navigation-list-item">
                <NavLink className="header-navigation-list-item-a"
                    to="/"
                    exact>
                    Home
                </NavLink>
            </li>
            <li className="header-navigation-list-item">
                <NavLink className="header-navigation-list-item-a"
                    to="/blogs/create"
                    exact>
                    Write a blog
                </NavLink>
            </li>
            <li className="header-navigation-list-item">
                <NavLink className="header-navigation-list-item-a"
                    to="/login/123"
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