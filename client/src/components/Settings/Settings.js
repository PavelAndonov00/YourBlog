import { Switch, Route, withRouter } from 'react-router-dom';

import './Settings.css';
import SettingsMenu from './SettingsMenu';
import ChangePassword from './ChangePassword/ChangePassword';
import ChangeEmail from './ChangeEmail';

const Inner = ({

}) => {
    return (
        <h1>hello</h1>
    );
}

const Settings = () => {
    return (
        <section className="main-profile-settings">
            <SettingsMenu />

            <article className="main-profile-settings-main">
                <Switch>
                    <Route path="/profile/settings/changepassword" component={ChangePassword} exact />

                    <Route path="/profile/settings/changeemail" component={ChangeEmail} exact />
                </Switch>
            </article>
        </section>
    );
}

export default withRouter(Settings);