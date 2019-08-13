import React from "react";

const Tab = props => {

    const {
            _id, 
            title, 
            artist, 
            _tabId, 
            tabUrl, 
            status, 
            saveTab, 
            setWorking, 
            deleteTab, 
            setDone
        } = props;

    const getButtons = status => {
        switch(status) {
            case "found":
                return <button className="button" onClick={() => saveTab({
                            title, 
                            artist, 
                            _tabId, 
                            tabUrl, 
                            status
                        })}>Save</button>
            case "new": 
                return <button className="button" onClick={() => setWorking(props.tab)}>Mark As In Progress</button>
            case "working":
                return <button className="button" onClick={() => setDone(props.tab)}>Mark As Done</button>
            case "done":
                return <></>
            default: 
                return <></>
        } 
    } 

    return(
        <div className="tab-div" key={_tabId}>
            <a className="tan tab-title" href={tabUrl} target="_blank" rel="noopener noreferrer">{title}</a>
            <p className="tabs-text tab-artist" >{artist}</p>
            <div className="tab-buttons">
                {getButtons(status)}
                { status === "found" ? "" : <button 
                                                    className="button tab-button" 
                                                    onClick={() => deleteTab(_id, status)}>
                                                        Delete
                                            </button> }
            </div>
        </div>
    );
}

export default Tab;