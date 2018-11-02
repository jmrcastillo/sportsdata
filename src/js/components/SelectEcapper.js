

import React from "react";
import SportsCodes from "../lib/SportsCodes"
import Select from 'react-select';
import Utils from "../lib/Utils";


export default class SelectEcapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 'ALL',
      options: [],
    }

  }
  componentWillMount() {

  }
  componentDidMount() {
    this.subscribe_selected_sport = this.props.pubsub.subscribe('selected-sport', (message, data)=> {
      this.rebuildOptions(this.props);
      this.setState({selected: 'ALL'});
    });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe(this.subscribe_selected_sport);
  }

  componentWillReceiveProps(nextProps) {
    this.rebuildOptions(nextProps);
  }

  rebuildOptions(props) {
    let ecappers = [];

    for (var key in props.allPicks) {
      props.allPicks[key].forEach(pick=>{
        if (! ecappers.find(e=>{
          return e.ecapper_id === pick.ecapper_id;
        })) {
          ecappers.push({ecapper_id: pick.ecapper_id, ecapper_name: pick.ecapper_name});
        }
      })
    };

    ecappers.sort((a, b)=>{
      const first = 'larry';
      if (b.ecapper_id === first) {
        return 1;
      }
      if (a.ecapper_id === first) {
        return -1;
      }
      return (a.ecapper_name > b.ecapper_name);

    })


    // Build dropdown options from ecappers
    let options = [{value: 'ALL', label: "ALL Experts"}];
    ecappers.forEach(e=>{
      const option = {value: e.ecapper_id, label: e.ecapper_name};
      options.push(option);
    })

  //  console.log ("SelectEcapper Setting Options", options);

    this.setState({options: options});

  }

  render() {

    return (

      <Select
        value={this.state.selected}
        onChange={selection=>{
          this.setState ({selected: selection.value});
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






