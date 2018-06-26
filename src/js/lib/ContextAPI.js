import React, {Component, createContext} from "react";

// Provider and Consumer are connected through their "parent" context
const {Provider, Consumer} = createContext();

// Provider exported wrapped in an AppProvider
class AppProvider extends Component {

  state = {
    name: 'Playbook test',
    age: 10,
    cool: true,
    picks: [],
    // Start real data
    isMobile: false,
  }

  render() {
    //  console.log ("Provider: ", this.state.isMobile, this.props);
    return (
      <Provider value={{
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
        setIsMobile: (isMobile) => this.setState({isMobile: isMobile})

      }}>
        {this.props.children}
      </Provider>
    )
  }

}

export { AppProvider };

//  it will probably be exported most often.
export default Consumer;
