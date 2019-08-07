import React from "react";
import Tab from "./Tab.js"

const TabList = props => {

    const { _id, tabs} = props;

    console.log(tabs)

    return (
        <div>{tabs.map(tab => <Tab 
                key={_id} 
                tab={tab}
                {...tab}
                setWorking={props.setWorking}
                setDone={props.setDone}
                deleteTab={props.deleteTab}
            />)}
        </div>
    )
}

export default TabList;