import React from "react";

/*

Credits

Metronome: https://freesound.org/s/441644/
Creator: Blake N. "xtrgamr" (https://freesound.org/people/xtrgamr/)

Bass Drum: https://freesound.org/s/219609/
Creator: "ani_music" (https://freesound.org/people/ani_music/)

Snare: https://freesound.org/s/3146/
Creator: Derek Murphy "robbiesurp" (https://derekmurphy.com/)

Hi Hat: https://freesound.org/s/112491/
Creator: "cdiupe" (https://freesound.org/people/cdiupe/)

https://unsplash.com/photos/9zxZeisipcE

Markus Spiske: https://unsplash.com/@markusspiske

*/

const Credits = () => {
    return(
        <div className="credits-div">
            <p className="credits-title">Credits</p>
            <div>
                <p>
                    <span>Website, Guitar</span> by <a href="https://colonlopezcarlos.surge.sh/">Carlos Colon</a>
                </p>
            </div>
            <div>
                <p>
                    <a href="https://freesound.org/s/441644/">Metronome</a> by <a href="https://freesound.org/people/xtrgamr/">Blake N. "xtrgamr"</a>
                </p>
            </div>
            <div>
                <p>
                    <a href="https://freesound.org/s/219609/">Bass Drum</a> by <a href="https://freesound.org/people/ani_music/">"ani_music"</a>
                </p>
            </div>
            <div>
                <p>
                    <a href="https://freesound.org/s/3146/">Snare</a> by <a href="https://derekmurphy.com/">Derek Murphy</a>
                </p>
            </div>
            <div>
                <p>
                    <a href="https://freesound.org/s/112491/">Hi Hat</a> by <a href="https://freesound.org/people/cdiupe/">"cdiupe"</a>
                </p>
            </div>
            <div>
                <p>
                    <a href="https://unsplash.com/photos/1Pzhr6XPl6k">Background</a> by <a href="https://unsplash.com/@derekstory">Derek Story</a>
                </p>
            </div>
            <div>
                <p>
                    <a href="https://www.songsterr.com/a/wa/api/">External API</a> by <a href="https://www.songsterr.com">Songsterr</a>
                </p>
            </div>
        </div>
    )
}

export default Credits;