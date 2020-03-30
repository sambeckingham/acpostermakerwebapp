import React, {useContext, useState} from "react";
import ReactCrop from "react-image-crop"
import 'react-image-crop/dist/ReactCrop.css';
import {PosterMakerContext} from "./PosterMakerContext";

export function ImageCropper() {
    const [crop, setCrop] = useState({aspect: 1});
    const [image, setImage] = useState({})
    const [imageIsSet, setImageIsSet] = useState(false)
    const [QrCode, setQrCode] = useState("")
    const [imageSrc] = useContext(PosterMakerContext)

    const onImageLoaded = image => {
        setImage(image)
        setImageIsSet(true)
        setCrop({ aspect: 1, x: image.width / 4,  y: image.height / 4, width: image.width / 2 });
        return false; // Return false when setting crop state in here.
    };


    if (imageIsSet) {
        return (
            <div className="ImageCropper">
                <ReactCrop src={imageSrc} crop={crop} onChange={newCrop => setCrop(newCrop)}
                           onImageLoaded={onImageLoaded}/>
                <button onClick={() => getQRCodes(image, crop, setQrCode)}>Gimme that Poster!</button>
                <small>Give it a second, generating these QR codes takes time!</small>
                <img src={QrCode} alt={"QR Code"}/>
            </div>
        );
    } else {
        return (
            <div className="ImageCropper">
                <ReactCrop src={imageSrc} crop={crop} onChange={newCrop => setCrop(newCrop)}
                           onImageLoaded={onImageLoaded}/>
            </div>
        );
    }
}



function getQRCodes(image, crop, setQrCode) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );

    // As Base64 string
    const base64Image = canvas.toDataURL('image/jpeg');

    fetch("http://acpostermaker.com/api/QrCodeGenerator", {
        method: 'POST',
        body: base64Image,
        headers: {
            'Content-Type': 'text/plain',
            'Content-Encoding': 'base64'
        }
    }).then(response => response.blob()).then(blob => {
        setQrCode(URL.createObjectURL(blob))
    })
}
