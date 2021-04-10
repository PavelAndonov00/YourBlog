import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import Navigation from './Navigation';
import UserProfile from './UserProfile';

const Header = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <header className="header">
            <nav className="header-navigation">
                <Link to="/"
                    className="header-navigation-logo-wrapper">
                    <img src="/writing.svg"
                        alt="Logo" />
                    <span>Your Blog</span>
                </Link>

                <section className="header-navigation-right">
                    {user.isLogged || <Navigation />}
                    {user.isLogged && <UserProfile />}
                </section>
            </nav>
        </header>
    )
}

export default Header;