import React from "react";

const Tab = props => {

    const {title, artist, _tabId, tabUrl, saveTab} = props;

    return(
        <div>
            <a href={`http://www.songsterr.com/a/wa/song?id=${_tabId}`}>{title}</a>
            <p>by {artist}</p>
            <button onClick={() => saveTab()}>Save</button>
        </div>
    )
}

export default Tab;