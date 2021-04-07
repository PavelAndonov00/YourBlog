import { useContext } from 'react';
import { contextType } from 'react-infinite-scroll-component';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';
import Navigation from './Navigation';
import UserProfile from './UserProfile';
import Context from '../../contexts/context';

const Header = () => {
    let context = useContext(Context);
    console.log(context);

    return (
        <header className="header">
            <nav className="header-navigation">
                <ul className="header-navigation-logo-list">
                    <li className="header-navigation-logo-list-item">
                        <Link to="/"
                            className="header-navigation-logo-wrapper">
                            <img src="/writing.svg"
                                alt="Logo" />
                            <span>Your Blog</span>
                        </Link>
                    </li>
                    <li className="header-navigation-list-item">
                        <NavLink className="header-navigation-list-item-a"
                            to="/"
                            exact>
                            Home
                         </NavLink>
                    </li>
                </ul>
                <section className="header-navigation-right">
                    {context.user.isLogged || <Navigation />}
                    {context.user.isLogged && <UserProfile />}
                </section>
            </nav>
        </header>
    )
}

export default Header;