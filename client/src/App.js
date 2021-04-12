import React, { useEffect, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Settings from './components/Settings';
import BlogCrud from './components/BlogCrud';
import YourBlogs from './components/YourBlogs';
import Context from './contexts/context';

function App() {
	let user = JSON.parse(localStorage.getItem('user'));
	let scrollTop = React.createRef();
	let context = useContext(Context);

	useEffect(() => {
		if (context.message) {
			setTimeout(() => {
				context.setMessage("");
			}, 4000);
		}
	});

	return (
		<>
			<span ref={scrollTop} className="scroll-to-top"></span>
			<Header />

			<p className="information-message">{context.message}</p>
			<main className="main">
				<Switch>
					<Route path="/login" component={Login} exact />

					<Route path="/logout" component={Logout} exact />

					<Route path="/register" component={Register} exact />

					<Route path="/" exact>
						<Home scrollTop={scrollTop} />
					</Route>
					<Route path="/home" exact>
						<Home scrollTop={scrollTop} />
					</Route>

					{user?.isLogged || <Redirect to="/login" />}
					<Route path="/blogs/create" component={BlogCrud} exact/>
					<Route path="/blogs/edit/:id" component={BlogCrud} exact/>
					<Route path="/blogs/delete/:id" component={BlogCrud} exact/>

					<Route path="/profile/settings" component={Settings} />

					<Route path="/:username/blogs" component={YourBlogs} />
				</Switch>
			</main>

			<Footer />
		</>
	);
}

export default App;