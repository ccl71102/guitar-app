import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle, faPlayCircle, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";


const Metronome = props => {

    const {handleChange, changeBPM, stopMetronome, playMetronome, bpm, isPlaying, metronome} = props;

    return(
    <div>
        <p>Metronome</p>
        <select onChange={handleChange} name="metronome" defaultValue={metronome}>
            <option value="Standard">Standard</option>
            <option value="Basic Beat">Basic Beat</option>
            {/* <option value="Blast Beats">Blast Beats</option> */}
        </select>
        <p>BPM: </p>
        <input onChange={props.handleChange} readOnly type="number" name="bpm" value={bpm} min="1" max="220"/>
        <FontAwesomeIcon onClick={() => changeBPM(1)} icon={faPlusCircle}/>
        <FontAwesomeIcon onClick={() => changeBPM(-1)} icon={faMinusCircle}/>
        {!isPlaying ? <FontAwesomeIcon icon={faPlayCircle} onClick={playMetronome}/> : <FontAwesomeIcon icon={faStopCircle} onClick={stopMetronome}/>}
    </div>
    );
}

export default Metronome;