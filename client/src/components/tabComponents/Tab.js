import React from "react";

const Tab = props => {

    const {_id, title, artist, _tabId, tabUrl, status, setWorking, deleteTab, setDone} = props;

    const getButtons = status => {
        switch(status) {
            case "new": 
                return <button onClick={() => setWorking(props.tab)}>Mark As In Progress</button>
            case "working":
                return <button onClick={() => setDone(props.tab)}>Mark As Done</button>
            case "done":
                return <></>
            default: 
                return <></>
        }
        
    } 

    return(
        <div key={_tabId}>
            <a href={tabUrl}>{title}</a>
            <p>{artist}</p>
            {getButtons(status)}
            <button onClick={() => deleteTab(_id)}>Delete</button>
        </div>
    )
}

export default Tab;