import React from "react";
import Navbar from "./components/layout/Navbar";
// import Users from "./components/users/Users";
import User from "./components/users/User";
import "./App.css";


import Home from "./components/pages/Home";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import NotFound from "./components/pages/NotFound";

const App = () => {
	////
	//const[loading,setloading]=useState(false);

	// async componentDidMount () {
	//   this.setState({loading: true});
	//   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
	//   this.setState({users: res.data, loading: false});
	// }

	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className='App'>
						<Navbar title='Github Finder' icon='fab fa-github' />

						<div className='container'>
							<Alert />

							<Switch>
								<Route
									exact
									path='/'
									component={Home}
								/>
								<Route exact path='/about' component={About} />
								<Route exact path='/user/:login' component={User} />
								 />
								 <Route component={NotFound}/>
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
};
export default App;
