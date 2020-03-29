import React, {useState} from "react";

const PosterMakerContext = React.createContext({});

const PosterMakerProvider = (props) => {
    const [imageSrc, setImageSrc] = useState("")

    return (
        <PosterMakerContext.Provider value={[imageSrc, setImageSrc]}>
            {props.children}
        </PosterMakerContext.Provider>
    );
}

export {PosterMakerContext, PosterMakerProvider}