// inside src/index.js
import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AppContext = React.createContext();



// Dummy test components for context api
class Person extends Component {
  render() {
    return (
      <div className="person">
        <AppContext.Consumer>
          {(context) => (
            <React.Fragment>
              <p>Age: {context.state.age}</p>
              <p>Name: {context.state.name}</p>
              <button onClick={e =>{
                console.log ("dummy value: ", context.dummy);
                context.growAYearOlder();
              }}>Add a Year</button>
            </React.Fragment>
          )}
        </AppContext.Consumer>
      </div>
    )
  }
}
const Holder = () => {
  return (
    <React.Fragment>
      <Person/>
    </React.Fragment>
  )
}

 const About = ()=>(
    <div>
        <h1>React App version {React.version} Running..</h1>
        <h1>Webpack build system 4.8.3.</h1>
    </div>
 )


// Global Provider
class AppProvider extends Component {

  state = {
    name: 'Playbook test',
    age: 10,
    cool: true,
    picks: [],
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        growAYearOlder: () => this.setState({
          age: this.state.age + 1
        }),
        dummy: 100,
        /*      loadPicks: ()=> {
                  console.log("Picks loaded");
                  PicksAPI.loadPicks().done((picks) => {
                      this.setState({picks: picks});
                  });
              }*/

      }}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}



class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <React.Fragment>
          <p>App router here.</p>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>

            <hr />

          <Route exact path="/" component={Holder} />
          <Route path="/about" component={About} />

          </React.Fragment>
        </Router>
      </AppProvider>
    );
  }
}


render(
  <App/>,
  document.getElementById('root')
)


//       <Holder/>

/*const App = () => {
    return <div>
        <h1>React App version {React.version} Running..</h1>
        <h1>Webpack build system 4.8.3.</h1>
    </div>
}*/