

import React from "react";
import SportsCodes from "../lib/SportsCodes"
import Select from 'react-select';
import Utils from "../lib/Utils";


export default class SelectEcapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [],
    }

  }
  componentWillMount() {

  }
  componentDidMount() {
    this.subscribe_selected_sport = this.props.pubsub.subscribe('selected_sport', (message, data)=> {
      // this.setState({logged_in: true});
      // Reset our menu and ecappers = ALL
    });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe(this.subscribe_selected_sport);
  }

  componentWillReceiveProps(nextProps) {

//  TODO:  This should become a function to call from listener above

    // Scan allPicks, build list of ecappers
    let ecappers = [];

    for (var key in nextProps.allPicks) {
      nextProps.allPicks[key].forEach(pick=>{
        if (! ecappers.find(e=>{
          return e.ecapper_id === pick.ecapper_id;
        })) {
        ecappers.push({ecapper_id: pick.ecapper_id, ecapper_name: pick.ecapper_name});
        }
      })
    };

    // Todo: sort, larry first?


    // Build dropdown options from ecappers
    let options = [{value: 'ALL', label: "ALL Experts"}];
    ecappers.forEach(e=>{
      const option = {value: e.ecapper_id, label: e.ecapper_name};
      options.push(option);
    })

    this.setState({options: options});
  }


  render() {

    //  console.log ("Render selected-sport is", Utils.getCookie('selected-sport'));
    let selected = Utils.getCookie('selected-ecapper');
    if (! selected || selected.length == 0) {
      selected = 'ALL';
    }

    return (

      <Select
        value={selected}
        onChange={selection=>{
          Utils.saveCookie('selected-ecapper', selection.value);
          this.props.pubsub.publish('selected-ecapper', selection.value);
        }}
        className={'reactSelect'}
        placeholder={
          'Select Expert'
        }
        options={this.state.options}

      />

    );
  }
}






