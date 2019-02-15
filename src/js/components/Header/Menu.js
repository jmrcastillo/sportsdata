import React from "react";
import {render} from 'react-dom'
import { Collapse, Button, CardBody, Card,
            Navbar,
            NavbarToggler,
            NavbarBrand,
            Nav,
            NavItem,
            NavLink,
            UncontrolledDropdown,
            DropdownToggle,
            DropdownMenu,
            DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import Login from "../Login";
import {GlobalContext} from "../../lib/GlobalContext";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import PubSub from 'pubsub-js';


const MODES = {
    normal: {value: 0, name: "Normal", code: "N"},
    checkout: {value: 1, name: "Checkout", code: "C"},
    showPicks: {value: 2, name: "Show Picks", code: "S"},
};

export default class Menu extends React.Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);

        this.pubsub = PubSub;
        this.notificationManager = NotificationManager;

        // this.toggle = this.toggle.bind(this);
        this.state = {collapse: false,
                        isOpen: false,
                        modal: false,
                        picks: [],
                        allPicks: [],
                        freePicks: [],
                        selectedPicks: '',
                        purchasedPicks: [],
                                logged_in: false,
                        displayMode: MODES.normal,
                        isTokens: false,
                        isRegistering: false,
                        member: {}};
        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
      }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    // componentWillMount() {
    //     this.props.pubsub.publish('empty-cart');
    // }
  
    // componentDidMount() {
    //   this.subscribe_logged_in = this.props.pubsub.subscribe('logged-in', (message, data) => {
    //     this.setState({modalIsOpen: false});
    //   });
  
    // }
  
    // componentWillUnmount() {
    //   this.props.pubsub.unsubscribe(this.subscribe_logged_in);
    // }

	render() {
		return (
        <React.Fragment>
            <div className="container p-0">
                <div className="logo">
                <a href="http://www.playbook.com">
                    <img alt="Playbook.com" src="http://www.playbook.com/playbook_logo6.png" width="239" />
                </a>
                </div>
            </div>

            <div className="container p-0 pl-navbar">
            <Navbar className="navbar navbar-expand-lg navbar-light rounded p-0" id="pa-navbar-menu" >
                <NavbarToggler onClick={this.toggle} />                
                <Collapse isOpen={this.state.isOpen} navbar id="pa-navbar">
                <Nav className="navbar-nav mr-auto">
                    <NavItem className="nav-item">
                        <NavLink className="nav-link" href="http://www.playbook.com"><span className="topnav_trebuchet16Bwhite">Home</span></NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>Shops</DropdownToggle>
                    <DropdownMenu className="dropdown-menu pa-lg-dropdown">
                        <DropdownItem>
                            <div className="row m-0">
                                <h2 className="w-100">Current Featured Products</h2>
                                <div className="col-md-3 col-6"> <a href="https://www.ipsports.net/ecps/ecapper_store/product_info.php?PRODUCT_ID=6000106&amp;SITE_ID=0"><img src="https://www.ipsports.net/ecps/site_locals/store/0/product_images/fb.jpg" width="82" border="0"  alt="" />
                                    <p>Playbook Football Newsletter online weekly subscription thru the Super Bow...</p></a>
                                </div>
                                <div className="col-md-3 col-6"> 
                                <a href="https://www.ipsports.net/ecps/ecapper_store/product_info.php?PRODUCT_ID=1190&amp;SITE_ID=0"><img src="https://www.ipsports.net/ecps/site_locals/store/0/product_images/2014yb.jpg" width="82"  border="0"  alt="" />
                                <p>Marc Lawrence's Playbook Football Preview Guide magazine is the nation's best-selling football publication...</p></a>
                                </div>
                            </div>
                        </DropdownItem>
                        <DropdownItem>
                            <div className="w-100">
                                <h2>Products And Services</h2>
                                <div className="col_full">
                                    <h3>Online Publications</h3>
                                    <p><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&amp;CATEGORY_ID=1">Newsletters, Digital Magazines and more.</a><br /><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&amp;CATEGORY_ID=1">Read more...</a></p>
                                    <h3>Print Publications</h3>
                                    <p><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&amp;CATEGORY_ID=2">Magazines, Black Book
                                    Stat & Log Book
                                    Printed and Shipped.</a><br /><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&CATEGORY_ID=2">Read more...</a></p>
                                    <h3>Services</h3>
                                    <p>  <a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&amp;CATEGORY_ID=3">Marc Lawrence's
                                    Late Phone Service,
                                    All Sports, Internet Picks
                                    Packages</a><br /><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&CATEGORY_ID=3">Read more...</a></p>
                                    <h3>Memberships</h3>
                                    <p>  <a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&CATEGORY_ID=ALL">VIP All Access Membership, Members Save 20% All The Time Everytime!</a><br /><a href="https://www.ipsports.net/ecps/ecapper_store/index.php?SITE_ID=0&CATEGORY_ID=ALL">Read more...</a></p>
                                </div>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar className="nav-item dropdown">
                    <DropdownToggle nav caret>Experts</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="dropdown-item" href="https://www.picksite.com/picks">Today's Guaranteed Picks</DropdownItem>
                        <DropdownItem className="dropdown-item" href="http://www.playbook.com/Playbook-Sports-Picks#freepicks">Today's Free Picks</DropdownItem>
                        <DropdownItem className="dropdown-item" href="http://www.playbook.com/Playbook-Handicappers/">Experts Home Page</DropdownItem>
                        <DropdownItem className="dropdown-item" href="http://www.playbook.com/Handicapper-Report-Card">Experts Report Card</DropdownItem>
                        <DropdownItem className="dropdown-item" href="http://www.playbook.com/Playbook-Picks-Policy">Playbook Picks Policy</DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem className="nav-item">
                        <NavLink className="nav-link" href="http://www.playbook.com/Playbook-Lines-Scores/"><span className="topnav_trebuchet16Bwhite">Lines/Scores</span></NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink className="nav-link" href="http://www.playbook.com/Playbook-Basketball/"><span className="topnav_trebuchet16Bwhite">Basketball</span></NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink className="nav-link" href="http://www.playbook.com/Playbook-Football/"><span className="topnav_trebuchet16Bwhite">Football</span></NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink className="nav-link" href="http://www.playbook.com/TokenRewards/"><span className="topnav_trebuchet16Bwhite">Get Tokens</span></NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar className="nav-item dropdown">
                        <DropdownToggle nav caret>Betting Tools</DropdownToggle>
                        <DropdownMenu className="dropdown-menu">
                            <DropdownItem className="dropdown-item">
                                Stats Center</DropdownItem>
                            <DropdownItem className="dropdown-item" href="http://www.playbook.com/Playbook-Betting-Tools#capperslounge">Cappers Lounge</DropdownItem>
                            <DropdownItem className="dropdown-item" href="http://www.playbook.com/Playbook-Betting-Tools/vids_audio.php">Videos / Podcast</DropdownItem>
                            <DropdownItem className="dropdown-item" href="http://www.playbook.com/Playbook-Advantage">Playbook Advantage</DropdownItem>
                            <DropdownItem className="dropdown-item" href="http://www.playbook.com/angles_systems_trends.html">Systems, Angles & Trends</DropdownItem>
                            <DropdownItem className="dropdown-item" href="http://www.playbook.com/blackbook_systems.html">Black Book Systems</DropdownItem>
                            <DropdownItem className="dropdown-item" href="http://www.sportsbookreview.com/betting-sites/" target="_blank">Sportsbook Rankings</DropdownItem>
                            <DropdownItem className="dropdown-item" href="http://www.playbook.com/pages/sports_pages2012.html">Sports Pages</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem className="nav-item">
                        <NavLink className="nav-link" href="http://www.playbook.com"><span className="topnav_trebuchet16Bwhite">Member Center</span></NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            </div>

            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className='modal-cartlogin'>
                <ModalBody>
                <div className="loginbox px-4 py-2">
                    <Login
                    // freePick={this.featuredFreePick(this.state.freePicks)}
                    pubsub={this.pubsub}
                    showFreePlay={this.state.selectedPicks.length === 0}
                    notificationManager={this.notificationManager}
                //    hideDisplay={this.state.isRegistering}
                  />
                </div>
                </ModalBody>
            </Modal>

            </React.Fragment>
		);
	}
}
