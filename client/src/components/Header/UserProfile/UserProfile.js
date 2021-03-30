import { useState } from 'react';
import { Link } from 'react-router-dom';

import './UserProfile.css';

const UserProfile = () => {
    var [clicked, setClicked] = useState(false);
    const onClickProfile = (ev) => {
        setClicked(!clicked);
    }

    return (
        <section className="header-navigation-profile-wrapper">
            <img className="header-navigation-profile-img"
                src="no-avatar.svg"
                alt="Profile"
                onClick={onClickProfile} />
            <article style={{ display: clicked ? "block" : "none" }}
                className="header-navigation-profile-list-wrapper">
                <span className="header-navigation-profile-list-triangle" />
                <article className="header-navigation-profile-info">
                    <img src="no-avatar.svg"
                        alt="" />
                    <article>
                        <span>User</span>
                        <span>User@abv.bg</span>
                    </article>
                </article>
                <hr className="header-navigation-profile-info-line" />
                <ul className="header-navigation-profile-list">
                    <li className="header-navigation-profile-list-item">
                        <Link className="header-navigation-profile-list-item-a"
                            to="/Username/blogs">
                            Your blogs
                        </Link>
                    </li>
                    <li className="header-navigation-profile-list-item">
                        <Link className="header-navigation-profile-list-item-a"
                            to="/profile/editpersonalinfo">
                            Personal info
                        </Link>
                    </li>
                    <li className="header-navigation-profile-list-item">
                        <Link className="header-navigation-profile-list-item-a"
                            to="/profile/settings">
                            Settings
                        </Link>
                    </li>

                </ul>
            </article>
        </section>
    );
}

export default UserProfile;