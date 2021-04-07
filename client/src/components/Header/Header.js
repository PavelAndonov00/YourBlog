import { useContext } from 'react';
import { contextType } from 'react-infinite-scroll-component';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';
import Navigation from './Navigation';
import UserProfile from './UserProfile';
import Context from '../../contexts/context';

const Header = () => {
    let context = useContext(Context);

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
                    {context.user.isLogged || <Navigation />}
                    {context.user.isLogged && <UserProfile />}
                </section>
            </nav>
        </header>
    )
}

export default Header;