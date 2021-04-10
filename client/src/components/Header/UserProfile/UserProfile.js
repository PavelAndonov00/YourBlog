import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import './UserProfile.css';

const UserProfile = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let [clicked, setClicked] = useState(false);
    const showHideProfile = (ev) => {
        setClicked(!clicked);
    }

    return (
        <article className="header-navigation-profile-wrapper">
            <img className="header-navigation-profile-img"
                src="/no-avatar.svg"
                alt="Profile"
                onClick={showHideProfile} />
            <article style={{ display: clicked ? "block" : "none" }}
                className="header-navigation-profile-list-wrapper">
                <span className="header-navigation-profile-list-triangle" />
                <article className="header-navigation-profile-info">
                    <img src="/no-avatar.svg"
                        alt="" />
                    <article>
                        <span className="header-navigation-profile-info-truncate">{user.userName}</span>
                        <span className="header-navigation-profile-info-truncate">{user.email}</span>
                    </article>
                </article>
                <hr className="header-navigation-profile-info-line" />
                <ul onClick={showHideProfile}
                    className="header-navigation-profile-list">
                    <li className="header-navigation-list-item">
                        <Link className="header-navigation-profile-list-item-a"
                            to="/blogs">
                            Write a blog
                        </Link>
                    </li>
                    <li className="header-navigation-profile-list-item">
                        <Link className="header-navigation-profile-list-item-a"
                            to="/Username/blogs">
                            Your blogs
                        </Link>
                    </li>
                    <li className="header-navigation-profile-list-item">
                        <Link className="header-navigation-profile-list-item-a"
                            to="/profile/settings">
                            Settings
                        </Link>
                    </li>
                    <li className="header-navigation-profile-list-item">
                        <Link className="header-navigation-profile-list-item-a"
                            to="/logout">
                            Logout
                        </Link>
                    </li>
                </ul>
            </article>
        </article>
    );
}

export default UserProfile;