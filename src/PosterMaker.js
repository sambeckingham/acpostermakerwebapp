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
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                {/*<FileUpload/>*/}
                <input type="file" accept="image/*" onChange={handleImageUpload} multiple={false}/>
                <ImageCropper src={imageSrc}/>
            </header>
        </div>
    )
}