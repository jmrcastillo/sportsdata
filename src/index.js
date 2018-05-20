// inside src/index.js
import React, {Component} from 'react'
import {render} from 'react-dom'

const AppContext = React.createContext();



// Dummy test component for context api

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

// Global Provider
class AppProvider extends Component {

  state = {
    name: 'Wes',
    age: 100,
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


/*const App = () => {
    return <div>
        <h1>React App version {React.version} Running..</h1>
        <h1>Webpack build system 4.8.3.</h1>
    </div>
}*/

class App extends Component {
  render() {
    return (
      <AppProvider>

        <div>
          <p>App Root is here.</p>
      <Holder/>

        </div>
      </AppProvider>
    );
  }
}


render(
  <App/>,
  document.getElementById('root')
)
