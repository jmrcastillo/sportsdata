import React, {Component, createContext} from "react";

// Provider and Consumer are connected through their "parent" context
const GlobalContext = createContext();

//import Playbook from "../lib/Playbook";

// Provider exported wrapped in an AppProvider
class GlobalProvider extends Component {

  state = {
    isLoggingIn: false,
    isMobile: false,
    siteID: '0',

// Test values
    name: 'Playbook test',
    age: 10,
    cool: true,
    picks: [],


  }


  render() {
     // console.log ("Context API Rendering..", this);

    return (
      <GlobalContext.Provider value={{
        state: this.state,

        setIsMobile: (isMobile) => this.setState({isMobile: isMobile}),
        setSiteID: (siteID) => this.setState({siteID: siteID}),
        setIsLoggingIn: (isLoggingIn) => this.setState({isLoggingIn: isLoggingIn}),

      }}>
      {this.props.children}
      </GlobalContext.Provider>
    )
  }

}

//export { GlobalProvider };

//  it will probably be exported most often.
//export default GlobalContext;

export  {GlobalContext, GlobalProvider};


//     setIsMobile: (isMobile) => this.setState({isMobile: isMobile}, this.updateGlobalState),
//   setSiteID: (siteID) => this.setState({siteID: siteID}, this.updateGlobalState),
// getIsMobile: () => this.state.isMobile,
//         getIsLoggingIn: () => this.state.isLoggingIn,