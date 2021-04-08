import React, { useEffect, useContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Settings from './components/Settings';
import WriteBlog from './components/WriteBlog';
import YourBlogs from './components/YourBlogs/YourBlogs';
import Context from './contexts/context';
import jwt from 'jsonwebtoken';

function App() {
	let history = useHistory();
	let scrollTop = React.createRef();
	let context = useContext(Context);

	useEffect(() => {
		let token = localStorage.getItem("token");
		let decoded = jwt.decode(token);
		if (decoded && decoded.exp < Date.now() / 1000) {
			localStorage.setItem("token", "");
			context.setToken("");

			localStorage.setItem("user", JSON.stringify({}));
			context.setUser({});

			context.setMessage("Session expired!");
			history.push('/login');
		} else {
			context.setToken(token);
			let user = localStorage.getItem("user");
			context.setUser(user ? JSON.parse(user) : {});
		}
	}, []);

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

					<Route path="/blogs/create" component={WriteBlog} exact />

					<Route path="/profile/settings" component={Settings} />

					<Route path="/:username/blogs" component={YourBlogs} />

					<Route path="/">
						<Home scrollTop={scrollTop} />
					</Route>
					<Route path="/home">
						<Home scrollTop={scrollTop} />
					</Route>
				</Switch>
			</main>

			<Footer />
		</>
	);
}

export default App;