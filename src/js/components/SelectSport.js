

import React from "react";
import SportsCodes from "../lib/SportsCodes"
import Select from 'react-select';
import Utils from "../lib/Utils";


export default class SelectSport extends React.Component {

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
    this.subscribe_selected_ecapper = this.props.pubsub.subscribe('selected-ecapper', (message, data)=> {
      this.rebuildOptions(this.props);
      this.setState({selected: 'ALL'});
  //    this.props.pubsub.publish('selected-sport', 'ALL');
    });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe(this.subscribe_selected_ecapper);
  }

  componentWillReceiveProps(nextProps) {
    this.rebuildOptions(nextProps);
  }

  rebuildOptions(props) {
    // Scan Sports Codes, see which ones have length > 0
    const availableSports = SportsCodes.getSportsOrdered().filter((sport, i) => {
      const picks = props.allPicks[sport];
      return (typeof (picks) != 'undefined' && picks.length > 0);
    });

    // Build dropdown options from availableSports
    let options = [{value: 'ALL', label: "ALL Sports"}];
    availableSports.forEach(e=>{
      const option = {value: e, label: SportsCodes.getText(e)};
      options.push(option);
    })
  //  console.log ("SelectSport Setting Options", options);

    this.setState({options: options});
  }

  render() {


     return (

      <Select
        value={this.state.selected}
        onChange={selection=>{
          this.setState ({selected: selection.value});
          this.props.pubsub.publish('selected-sport', selection.value);
        }}
        className={'reactSelect col-12 col-md-6 my-1'}
        placeholder={
            'Select Sport'
        }
        options={this.state.options}

      />

    );
  }
}






