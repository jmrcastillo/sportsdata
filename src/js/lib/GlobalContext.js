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

   //     setIsMobile: (isMobile) => this.setState({isMobile: isMobile}, this.updateGlobalState),
     //   setSiteID: (siteID) => this.setState({siteID: siteID}, this.updateGlobalState),

        setIsMobile: (isMobile) => this.setState({isMobile: isMobile}),
        getIsMobile: () => this.state.isMobile,

        setIsLoggingIn: (isLoggingIn) => this.setState({isLoggingIn: isLoggingIn}),
        getIsLoggingIn: () => this.state.isLoggingIn,


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

