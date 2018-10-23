

import React from "react";
import SportsCodes from "../lib/SportsCodes"
import Select from 'react-select';
import Utils from "../lib/Utils";


export default class SelectSport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [],
    }
    this.selectStyle  = {
/*      option: (base, state) => ({
        ...base,
        borderBottom: '1px dotted pink',
        color: state.isFullscreen ? 'red' : 'blue',
        padding: 20,
      }),*/
      control: () => ({
        // none of react-selects styles are passed to <View />
        width: 100,
      }),
/*      singleValue: (base, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...base, opacity, transition };
      }*/
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

    // Build dropdown options from availableSports
    let options = [{value: 'ALL', label: "ALL Sports"}];
    availableSports.forEach(e=>{
      const option = {value: e, label: SportsCodes.getText(e)};
      options.push(option);
    })

    this.setState({options: options});
  }


  render() {

  //  console.log ("Render selected-sport is", Utils.getCookie('selected-sport'));
    return (

      <Select
        value={Utils.getCookie('selected-sport')}
        onChange={selection=>{
          Utils.saveCookie('selected-sport', selection.value);
          this.props.pubsub.publish('selected-sport', selection.value);
        }}
        styles={this.selectStyle}

        options={this.state.options}
      />



    );
  }
}






