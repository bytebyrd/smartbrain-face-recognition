import React from "react";
import './FaceRecognition.css'
const FaceRecognition = ({ url, box }) => {
    return (<div className="center ma">
        <div className="bounding-box__container absolute mt2">
            {box && <div
                id="boundingBox"
                className="bounding-box"
                style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
            </div>}

            {url ?
                <img id="inputImage" alt="" src={url} width="500px" height="auto"/>
                : <div className="facebox facebox--empty"></div>}
        </div>
    </div>)
}

export default FaceRecognition;