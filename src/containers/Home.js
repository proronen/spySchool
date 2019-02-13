import React, { Component } from 'react'
import Dirwatch from './Dirwatch';
import { connect } from 'react-redux';
import  { getFolders } from '../actions'
import { bindActionCreators } from 'redux';

class Home extends Component {

  componentDidMount() {
     // get directory structure from server
     this.props.getFolders();
  }

  render() {
     const { folders } = this.props.foldersReducer;
     return ( 
          <div id="container">
          
               <h1>HELLO DIR SPY</h1>
               
               <div id="dirwatch_cont">
                    {!folders && <p>Service is offline, Please try later(...run node server)</p>}
                    {folders && <Dirwatch folders={folders}/>}
               </div>
          </div>
     )
  }
}
 
const mapStateToProps = (state) => ({
     foldersReducer: state.foldersReducer
 })
   
const mapDispatchToProps = dispatch => bindActionCreators({getFolders}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);