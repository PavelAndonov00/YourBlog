import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/Settings';
import WriteBlog from './components/WriteBlog';

function App() {
	return (
		<>
			<Header></Header>

			<main className="main">
				<Switch>
					<Route path="/login" component={Login} exact />
					<Route path="/login/:id" component={Login} exact />

					<Route path="/register" component={Register} exact />

					<Route path="/blogs/create" component={WriteBlog} exact />

					<Route path="/profile/settings" component={Settings} />

					<Route path="/" component={Home} exact />
				</Switch> 
			</main>
		</>
	);
}

export default App;
