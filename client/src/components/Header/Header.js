import { Link } from 'react-router-dom';

import './Header.css';
import UserProfile from './UserProfile';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header className="header">
            <nav className="header-navigation">
                <section className="header-navigation-logo-navigation-section">
                    <Link to="/"
                        className="header-navigation-logo-wrapper">
                        <img src="writing.svg"
                            alt="Logo" />
                        <span>Your Blog</span>
                    </Link>
                    <Navigation />
                </section>
                <UserProfile />
            </nav>
        </header>
    )
}

export default Header;