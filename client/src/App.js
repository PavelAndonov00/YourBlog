import { Route, Link } from 'react-router-dom';

import './App.css';
import Test from './components/Test/Test';
import Header from './components/Header/Header';

function App() {
	return (
		<>
			<Header></Header>

			<Route path="/test" component={Test}></Route>
		</>
	);
}

export default App;
