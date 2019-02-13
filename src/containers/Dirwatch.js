import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {start_spylog, populize_spylog, stop_spylog, select_dirs} from '../actions'
import { bindActionCreators } from 'redux';

import Spylog from '../components/Spylog';
import Errors from '../components/Errors';

class Dirwatch extends Component {
    
    componentDidMount(){
        this.eventSource = new EventSource("/eventstream");
        
        this.eventSource.onmessage = e => {
            if(e.data && JSON.parse(e.data).msg) 
                this.props.populize_spylog(JSON.parse(e.data).msg)
            
        }
    }

    state = {
        folders: this.props.folders,
        errors: null,
        spyLog: null
    }

    StartSpying = () => {
        this.props.start_spylog();
    }
    
    StopSpying = () => {
        this.props.stop_spylog();
    }
    
    render() {
        
        const { spyData, started } = this.props.spylogReducer;
        const { folders, selectedDirs } = this.props.foldersReducer;
        const { error_messages } = this.props.systemReducer;
        const { select_dirs } = this.props;
        
        return ( 
            <React.Fragment>
               
                <p className="center">
                    Please choose the folders you would like to spy on
               </p>

                {folders.map( (folder, i) => {
                    const isSelected = ((selectedDirs.includes(folder.dirName) ? "folderSelected" : null));
                    return (
                        <div key={folder.id} className={isSelected} onClick={() => select_dirs(folder.dirName)}>  {folder.absName}</div>
                    )
                })}
                <p className="center">
                    {!started && <button className='spyingBtn' onClick={() => this.StartSpying()}> START SPYING </button>}
                </p>
             
                {error_messages && <Errors msg={error_messages} />}
                {started && <Spylog stopBtn={this.StopSpying} spyData={spyData} />}
             
            </React.Fragment>
        )
  }
}

const mapStateToProps = (state) => {
    return ({
        foldersReducer: state.foldersReducer,
        spylogReducer: state.spylogReducer,
        systemReducer: state.systemReducer,
    })
}
  
const mapDispatchToProps = dispatch => bindActionCreators({select_dirs,start_spylog,  populize_spylog , stop_spylog}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Dirwatch);