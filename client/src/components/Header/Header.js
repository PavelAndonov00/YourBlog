import { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import UserProfile from './UserProfile/UserProfile';
import Navigation from './Navigation/Navigation';

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
                    <Navigation />
                    <UserProfile />
                </nav>
            </header>
        )
    }
}

export default Header;