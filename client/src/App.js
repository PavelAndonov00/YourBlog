import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import Register from './components/Register';
import Settings from './components/Settings';
import WriteBlog from './components/WriteBlog';
import YourBlogs from './components/YourBlogs/YourBlogs';

function App() {
	var scrollTop = React.createRef();
	
	return (
		<>
			<span ref={scrollTop} className="scroll-to-top"></span>
			<Header />

			<main className="main">
				<Switch>
					<Route path="/login" component={Login} exact />
					<Route path="/login/:id" component={Login} exact />

					<Route path="/register" component={Register} exact />

					<Route path="/blogs/create" component={WriteBlog} exact />

					<Route path="/profile/settings" component={Settings} />

					<Route path="/profile/personalinfo" component={PersonalInfo} />

					<Route path="/:username/blogs" component={YourBlogs} />

					<Route path="/" exact>
						<Home scrollTop={scrollTop}/>
					</Route>
					<Route path="/home">
						<Home scrollTop={scrollTop}/>
					</Route>
				</Switch>
			</main>

			<Footer />
		</>
	);
}

export default App;
