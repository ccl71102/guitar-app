import React, { Component } from "react";
import Tuner from "./toolComponents/Tuner.js";
import Metronome from "./toolComponents/Metronome.js";
import metronomePath from "../audio/metronome/metronome.mp3";
import kickMidPath from "../audio/drums/bassdrumhihat-mid.mp3";
import kickShortPath from "../audio/drums/bassdrumhihat-short.mp3";
import snareMidPath from "../audio/drums/snarehihat-mid.mp3";
import snareShortPath from "../audio/drums/snarehihat-short.mp3";
import snareShortBlastBeatPath from "../audio/drums/snare-short.mp3"
import snareMidBlastBeatPath from "../audio/drums/snare-mid.mp3"
import A1 from "../audio/guitar/A1.mp3";
import A2 from "../audio/guitar/A2.mp3";
import B1 from "../audio/guitar/B1.mp3";
import B2 from "../audio/guitar/B2.mp3";
import B3 from "../audio/guitar/B3.mp3";
import D2 from "../audio/guitar/D2.mp3";
import D3 from "../audio/guitar/D3.mp3";
import E2 from "../audio/guitar/E2.mp3";
import E4 from "../audio/guitar/E4.mp3";
import FS1 from "../audio/guitar/FS1.mp3";
import G3 from "../audio/guitar/G3.mp3";

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

        this.setState({
            [name]: value
        }, () => this.saveToLocalStorage());
    }

    changeBPM = value => {
        if(this.state.bpm >= 220 || this.state.bpm <= 1)
            return;

        this.setState({
           bpm: this.state.bpm + value
        }, () => this.saveToLocalStorage());
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

        if(this.state.metronome === "Standard"){

            let metronome = new Audio(metronomePath);
            let tempo = Math.floor(1000 / ((this.state.bpm) / 60));

            this.intervalMetronome = setInterval(() => {
                metronome.play();
            }, tempo);
        }

        if(this.state.metronome === "Blast Beats"){
            let kick = new Audio(kickMidPath);
            let snare = new Audio(snareMidBlastBeatPath);

            if(this.state.bpm > 130){
                kick = new Audio(kickShortPath);
                snare = new Audio(snareShortBlastBeatPath);
            }

            let tempo = Math.floor(1000 / ((this.state.bpm) / 60))/2;

            console.log(tempo)

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

            if(this.state.bpm > 130){
                kick = new Audio(kickShortPath);
                snare = new Audio(snareShortPath);
            }

            let tempoFirstBeat = Math.floor(1000 / ((this.state.bpm) / 60));
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

   render() {

    return (
        <div>
            <Tuner
                {...this.props} 
                {...this.state} 
                handleChange={this.handleChange}
                playString={this.playString}
            />
            <Metronome               
                {...this.props} 
                {...this.state} 
                handleChange={this.handleChange}
                changeBPM={this.changeBPM}
                playMetronome={this.playMetronome}
                stopMetronome={this.stopMetronome}
            />
        </div>
    );
   }
}

export default Tools;