import React from 'react';
import './App.css';
import 'react-image-crop/dist/ReactCrop.css';
import {PosterMakerProvider} from "./PosterMakerContext";
import {PosterMaker} from "./PosterMaker";

function App() {

    return (
        <PosterMakerProvider>
            <PosterMaker/>
        </PosterMakerProvider>
    );
}

export default App;
