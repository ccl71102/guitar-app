import React, { Component } from "react";
import Tuner from "./Tuner.js";
import Metronome from "./Metronome.js";
import fretboard from "../../images/fretboard-sideways.jpg";
import fretboard7String from "../../images/fretboard-sideways-7string.png"
import fretboard8String from "../../images/fretboard-sideways-8string.png"
import metronomePath from "../../audio/metronome/metronome.mp3";
import kickMidPath from "../../audio/drums/bassdrumhihat-mid.mp3";
import kickShortPath from "../../audio/drums/bassdrumhihat-short.mp3";
import snareMidPath from "../../audio/drums/snarehihat-mid.mp3";
import snareShortPath from "../../audio/drums/snarehihat-short.mp3";
import snareShortBlastBeatPath from "../../audio/drums/snare-short.mp3"
import snareMidBlastBeatPath from "../../audio/drums/snare-mid.mp3"
import A1 from "../../audio/guitar/A1.mp3";
import A2 from "../../audio/guitar/A2.mp3";
import B1 from "../../audio/guitar/B1.mp3";
import B2 from "../../audio/guitar/B2.mp3";
import B3 from "../../audio/guitar/B3.mp3";
import D2 from "../../audio/guitar/D2.mp3";
import D3 from "../../audio/guitar/D3.mp3";
import E2 from "../../audio/guitar/E2.mp3";
import E4 from "../../audio/guitar/E4.mp3";
import FS1 from "../../audio/guitar/FS1.mp3";
import G3 from "../../audio/guitar/G3.mp3";

class Tools extends Component {

    constructor(){
        super();
        this.state = {
            bpm: Number(localStorage.getItem("bpm")) || 120,
            metronome: localStorage.getItem("metronome") || "Standard",
            tuning: localStorage.getItem("tuning") || "E Standard",
            isPlaying: false
        };
        this.intervalMetronome = null;
        this.intervalBasicBeatKickHiHat = null;
        this.intervalBasicBeatSnareHiHat = null;
        this.intervalBlastBeatSnare = null;
    }

    saveToLocalStorage = () => {
        localStorage.setItem("bpm", this.state.bpm);
        localStorage.setItem("metronome", this.state.metronome);
        localStorage.setItem("tuning", this.state.tuning);
    }

    handleChange = e => {

        const { name, value } = e.target;

        if(name === "bpm") {
            if(!isNaN(value)){
                this.setState({
                    [name]: value
                }, () => this.saveToLocalStorage());
            } else {
                return;
            }
        }

        this.setState({
            [name]: value
        }, () => this.saveToLocalStorage());
    }

    changeBPM = value => {

    if(!isNaN(value))
        if(Number(this.state.bpm) > 220 || Number(value) > 220) {
            this.setState({
                bpm: Number(220)
            }, () => this.saveToLocalStorage());
        } else {
            this.setState({
                bpm: Number(this.state.bpm) + Number(value)
            }, () => this.saveToLocalStorage());
        }
    }

    playString(noteName){
        
        let note = null;

        switch(noteName){
            case "A1":
                note = new Audio(A1);
                break;
            case "A2":
                note = new Audio(A2);
                break;
            case "B1":
                note = new Audio(B1);
                break;
            case "B2":
                note = new Audio(B2);
                break;
            case "B3":
                note = new Audio(B3);
                break;
            case "D2":
                note = new Audio(D2);
                break;
            case "D3":
                note = new Audio(D3);
                break;
            case "E2":
                note = new Audio(E2);
                break;
            case "E4":
                note = new Audio(E4);
                break;
            case "F#1":
                note = new Audio(FS1);
                break;
            case "G3":
                note = new Audio(G3);
                break;
            default:
                note = new Audio(A1);
                break;
        }

        try{
            note.play();
        }
        catch(e){
            console.log("Note not found");
        }
    }

    playMetronome = () => {

        this.setState({
            isPlaying: true
        });

        let bpmCap = Number(this.state.bpm);

        if(bpmCap > 220) {
            bpmCap = 220;
            this.setState({
                bpm: 220
            });
        } else if(bpmCap < 10){
            bpmCap = 10;
            this.setState({
                bpm: 10
            });
        }

        if(this.state.metronome === "Standard"){

            let metronome = new Audio(metronomePath);
            let tempo = Math.floor(1000 / ((Number(bpmCap)) / 60));

            this.intervalMetronome = setInterval(() => {
                metronome.play();
            }, tempo);
        }

        if(this.state.metronome === "Blast Beats"){
            let kick = new Audio(kickMidPath);
            let snare = new Audio(snareMidBlastBeatPath);

            if(bpmCap > 130){
                kick = new Audio(kickShortPath);
                snare = new Audio(snareShortBlastBeatPath);
            }

            let tempo = Math.floor(1000 / ((Number(bpmCap)) / 60))/2;

            this.intervalBasicBeatKickHiHat = setInterval(() => {
                kick.play();
            }, tempo);

            setTimeout(() => this.intervalBlastBeatSnare = setInterval(() => {
                snare.play();
            }, tempo), tempo/2);  
        }

        if(this.state.metronome === "Basic Beat"){

            let kick = new Audio(kickMidPath);
            let snare = new Audio(snareMidPath);

            if(bpmCap > 150){
                kick = new Audio(kickShortPath);
                snare = new Audio(snareShortPath);
            }

            let tempoFirstBeat = Math.floor(1000 / ((Number(bpmCap)) / 60));
            let tempoSecondBeat = tempoFirstBeat * 2;

            this.intervalBasicBeatKickHiHat = setInterval(() => {
                kick.play();
            }, tempoFirstBeat);

            this.intervalBasicBeatSnareHiHat = setInterval(() => {
                snare.play();
            }, tempoSecondBeat);
        }
    }

    stopMetronome = () => {

        this.setState({
            isPlaying: false
        }, () => {
            clearInterval(this.intervalMetronome);
            clearInterval(this.intervalBasicBeatKickHiHat);
            clearInterval(this.intervalBasicBeatSnareHiHat);
            clearInterval(this.intervalBlastBeatSnare);
        });
    }

    getFret = () => {
        const { tuning } = this.state;

        if(tuning === "E Standard" || tuning === "Dropped D") {
            return {
                        fretboard, 
                        style: "tuner-fretboard"
                    };
        }
        
        if(tuning === "E Standard (7 String)" || tuning === "Dropped A (7 String)") {
            return {
                        fretboard: fretboard7String,
                        style: "tuner-fretboard-7string"
                    };
        }

        if(tuning === "E Standard (8 String)"){
            return {
                        fretboard: fretboard8String,
                        style: "tuner-fretboard-8string"
                    };
        }
    }

   render() {

    return (
        <div className="tools-container">
            <Metronome               
                {...this.props} 
                {...this.state} 
                handleChange={this.handleChange}
                changeBPM={this.changeBPM}
                playMetronome={this.playMetronome}
                stopMetronome={this.stopMetronome}
            />
            <div className="tuner-div">
                <Tuner
                    {...this.props} 
                    {...this.state} 
                    handleChange={this.handleChange}
                    playString={this.playString}
                />
                <div>
                    <img className={this.getFret().style} src={this.getFret().fretboard} alt="fretboard"/>
                </div>
            </div>
        </div>
    );
   }
}

export default Tools;