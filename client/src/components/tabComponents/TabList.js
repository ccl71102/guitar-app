import React from "react";
import Tab from "./Tab.js"

const TabList = props => {

    const { tabs } = props;

    return (
        <div>{tabs.map(tab => <Tab/>)}</div>
    )
}

export default TabList;