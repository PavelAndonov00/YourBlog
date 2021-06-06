import { Component } from 'react';
import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';

import './SettingsMenu.css';

class SettingsMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showed: true
        }

        this.showHideMenu = this.showHideMenu.bind(this);
    }

    showHideMenu() {
        var curWidth = window.screen.width;
        if(curWidth > 650) return;

        this.setState(oldState => { return { ...oldState, showed: !this.state.showed } });
    }

    render() {
        return (
            <aside className="main-profile-settings-menu">
                <img className="main-profile-settings-menu-img"
                    src="/hamburger.svg"
                    alt="Hamburger"
                    onClick={this.showHideMenu} />
                <ul onClick={this.showHideMenu}
                    style={{ display: this.state.showed ? "block" : "none" }}
                    className="main-profile-settings-menu-list">
                    <li>
                        Menu
                    </li>
                    <hr />
                    <li className="main-profile-settings-menu-list-item">
                        <NavLink to="/profile/settings/changepassword"
                            className="main-profile-settings-menu-list-item-a" >
                            Change password
                        </NavLink>
                    </li>
                    <li className="main-profile-settings-menu-list-item">
                        <NavLink to="/profile/settings/changeemail"
                            className="main-profile-settings-menu-list-item-a" >
                            Change email
                        </NavLink>
                    </li>
                    <li className="main-profile-settings-menu-list-item">
                        <NavLink to="/profile/settings/personalinfo"
                            className="main-profile-settings-menu-list-item-a" >
                            Personal info
                        </NavLink>
                    </li>
                </ul>
            </aside>
        )
    }
}

export default SettingsMenu;