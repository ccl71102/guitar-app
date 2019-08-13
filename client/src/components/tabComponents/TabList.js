import React from "react";
import Tab from "./Tab.js"

const TabList = props => {

    const { tabs } = props;

    return (
        tabs.map(tab => <Tab 
                            key={tab._id}
                            tab={tab}
                            {...tab}
                            saveTab={props.saveTab}
                            setWorking={props.setWorking}
                            setDone={props.setDone}
                            deleteTab={props.deleteTab}
                        />)
    );
}

export default TabList;