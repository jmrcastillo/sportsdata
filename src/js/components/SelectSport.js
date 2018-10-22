

import React from "react";
import SportsCodes from "../lib/SportsCodes"
import Select from 'react-select';
import Utils from "../lib/Utils";


export default class SelectSport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avalableSports: [],
      options: [],
    }

  }
  componentWillMount() {

  }
  componentDidMount() {

  }


  componentWillReceiveProps(nextProps) {

    // Scan Sports Codes, see which ones have length > 0
    const availableSports = SportsCodes.getSportsOrdered().filter((sport, i) => {
      const picks = nextProps.allPicks[sport];
      return (typeof (picks) != 'undefined' && picks.length > 0);
    });


    let options = [{value: 'ALL', label: "ALL Sports"}];
    availableSports.forEach(e=>{
      const option = {value: e, label: SportsCodes.getText(e)};
      options.push(option);
    })




    this.setState({availableSports: availableSports, options: options});

 //   console.log ("GOt available", availableSports);

    }


  render() {

  const selectedOption = 'ALL';
    return (

      <Select
        value={selectedOption}
        onChange={selection=>{
          Utils.saveCookie('selected-sport', selection.value);
          this.props.pubsub.publish('selected-sport', selection.value);

        }}
        options={this.state.options}
      />



    );
  }
}






