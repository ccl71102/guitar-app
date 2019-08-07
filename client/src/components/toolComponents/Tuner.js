import React from "react";

const Tuner = props => {

    const {playString, handleChange, tuning} = props;

    const displayTuning = () => {
        switch(tuning){
            case "E Standard":
                    return (
                        <>
                            <button onClick={() => playString("E4")}>E4</button>
                            <button onClick={() => playString("B3")}>B3</button>
                            <button onClick={() => playString("G3")}>G3</button>
                            <button onClick={() => playString("D3")}>D3</button>
                            <button onClick={() => playString("A2")}>A2</button>
                            <button onClick={() => playString("E2")}>E2</button>
                        </>
                    );
            case "Dropped D":
                    return (
                        <>
                            <button onClick={() => playString("E4")}>E4</button>
                            <button onClick={() => playString("B3")}>B3</button>
                            <button onClick={() => playString("G3")}>G3</button>
                            <button onClick={() => playString("D3")}>D3</button>
                            <button onClick={() => playString("A2")}>A2</button>
                            <button onClick={() => playString("D2")}>D2</button>
                        </>
                    );
            case "E Standard (7 String)":
                    return (
                        <>
                            <button onClick={() => playString("E4")}>E4</button>
                            <button onClick={() => playString("B3")}>B3</button>
                            <button onClick={() => playString("G3")}>G3</button>
                            <button onClick={() => playString("D3")}>D3</button>
                            <button onClick={() => playString("A2")}>A2</button>
                            <button onClick={() => playString("E2")}>E2</button>
                            <button onClick={() => playString("B1")}>B1</button>
                        </>
                    );
            case "Dropped A (7 String)":
                    return (
                        <>
                            <button onClick={() => playString("E4")}>E4</button>
                            <button onClick={() => playString("B3")}>B3</button>
                            <button onClick={() => playString("G3")}>G3</button>
                            <button onClick={() => playString("D3")}>D3</button>
                            <button onClick={() => playString("A2")}>A2</button>
                            <button onClick={() => playString("E2")}>E2</button>
                            <button onClick={() => playString("A1")}>A1</button>
                        </>
                    );
        case "E Standard (8 String)":
                return (
                    <>
                        <button onClick={() => playString("E4")}>E4</button>
                        <button onClick={() => playString("B3")}>B3</button>
                        <button onClick={() => playString("G3")}>G3</button>
                        <button onClick={() => playString("D3")}>D3</button>
                        <button onClick={() => playString("A2")}>A2</button>
                        <button onClick={() => playString("E2")}>E2</button>
                        <button onClick={() => playString("B1")}>B1</button>
                        <button onClick={() => playString("F#1")}>F#1</button>
                    </>
                );
            default:
                    return (
                        <>
                        </>
                    );
        }
        
    }

    return(
    <div className="tuner-container">
       <p>Tuning</p>
       <select onChange={handleChange} name="tuning" defaultValue={tuning}>
            <option value="E Standard">E Standard</option>
            <option value="Dropped D">Dropped D</option>
            <option value="E Standard (7 String)">{"E Standard (7 String)"}</option>
            <option value="Dropped A (7 String)">{"Dropped A (7 String)"}</option>
            <option value="E Standard (8 String)">{"E Standard (8 String)"}</option>
        </select>
        <>
            {displayTuning()}
       </>
    </div>
    )
}

export default Tuner;