import React, {useContext} from "react";
import Files from "react-butterfiles"
import {PosterMakerContext} from "./PosterMakerContext";


export function FileUpload() {
    const [image, setImage] = useContext(PosterMakerContext)
    return (
        <Files
            multiple
            // convertToBase64
            maxSize="2mb"
            accept={["image/jpg", "image/jpeg", "image/png", "image/gif"]}
            onSuccess={files => setImage(files[0])}
            onError={() => {
            }}
        >
            {({browseFiles, getDropZoneProps}) => (
                <>
                    <label>Your files</label>
                    {/*<div {...getDropZoneProps({className: "myDropZone"})}/>*/}
                    <button onClick={browseFiles}>Select files...</button>
                    <ol>
                        <li key={image.name}>{image.id}</li>
                        <img src={image.src}/>
                    </ol>
                </>
            )}
        </Files>
    )
}