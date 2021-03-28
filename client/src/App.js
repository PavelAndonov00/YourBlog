import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './components/Home';

function App() {
	return (
		<>
			<Header></Header>

			<main className="main">
				<Switch>
					<Route path="/" component={Home} />
				</Switch>
			</main>
		</>
	);
}

export default App;
