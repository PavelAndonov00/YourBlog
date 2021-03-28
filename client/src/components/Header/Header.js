import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <nav className="header-navigation">
                    <Link to="/"
                        className="header-navigation-logo-wrapper">
                        <img src="writing2.svg"
                            alt="Logo" />
                        <span>Your Blog</span>
                    </Link>
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
                                to="/blog"
                                exact>
                                Write a blog
                            </NavLink>
                        </li>
                    </ul>

                    <Link className="header-navigation-profile"
                        to="/">
                        <img className="header-navigation-profile-img"
                            src="no-avatar.svg"
                            alt="" />
                    </Link>
                    <ul className="header-navigation-profile-list">
                        <li className="header-navigation-profile-list-triangle" />
                        <li className="header-navigation-profile-list-item">
                            <img className="header-navigation-profile-img"
                                src="no-avatar.svg"
                                alt="" />
                            <article>
                                <span>User</span>
                                <span>User@abv.bg</span>
                            </article>
                        </li>
                        <li className="header-navigation-profile-list-item">
                            <Link className="header-navigation-profile-list-item-a"
                                to="/">
                                Profile
                            </Link>
                        </li>
                        <li className="header-navigation-profile-list-item">
                            <Link className="header-navigation-profile-list-item-a"
                                to="/">
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;