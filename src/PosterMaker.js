import React, {useContext} from "react";
import {ImageCropper} from "./ImageCropper";
import {PosterMakerContext} from "./PosterMakerContext";

export function PosterMaker() {
    const [imageSrc, setImageSrc] = useContext(PosterMakerContext)

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                    <h1>Animal Crossing Poster Maker</h1>
                    <h2>Make any image into huge 4x4 design posters!</h2>
                    <h4>(More shapes and sizes coming soon!)</h4>
            </header>
            <main className="App-body">
                <input type="file" accept="image/*" onChange={handleImageUpload} multiple={false}/>
                <ImageCropper src={imageSrc}/>
            </main>
            <footer className="App-footer">
                <div>
                    <p>Find the code here: <a href="https://github.com/sambeckingham/ACPatternMaker">Backend</a> | <a
                        href="https://github.com/sambeckingham/acpostermakerwebapp">Frontend</a></p><p>
                    Follow me on Twitter <a href="https://twitter.com/SamboBeckingham">@SamboBeckingham</a></p>
                    <small>Animal Crossing is a registered trademark of Nintendo Co., Ltd. and AC Poster Maker is in no way affiliated.</small>
                </div>
            </footer>
        </div>
    )
}