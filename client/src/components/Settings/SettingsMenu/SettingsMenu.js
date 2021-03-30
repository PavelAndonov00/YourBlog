import { Component } from 'react';
import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';

import './SettingsMenu.css';

class SettingsMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside className="main-profile-settings-menu">
                <ul className="main-profile-settings-menu-list">
                    <li>
                        Menu
                    </li>
                    <hr/>
                    <li className="main-profile-settings-menu-list-item">
                        <NavLink to="/profile/settings/changepassword"
                            className="main-profile-settings-menu-list-item-a">
                            Change password
                        </NavLink>
                    </li>
                    <li className="main-profile-settings-menu-list-item">
                        <NavLink to="/profile/settings/changeemail"
                            className="main-profile-settings-menu-list-item-a">
                            Change email
                        </NavLink>
                    </li>
                </ul>
            </aside>
        )
    }
}

export default SettingsMenu;