import React from 'react'

export default function Spylog(props) {
    
    const data = props.spyData.split('|').join(String.fromCharCode(13, 10));
  
    return (
    <div>

        <div id="spylog_cont">
            <div id="spylog_inner_cont">{data}</div>
        </div>

      <button className='spyingBtn stopBtn' onClick={() => props.stopBtn()}> STOP SPYING </button>
    </div>
  )
}
