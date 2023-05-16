import React from "react";
import './ImageLinkForm.css'
const ImageLinkForm = ({ onInputChange, onDetectImage }) => {

    return (
        <div>
            <p className="f3" style={{ textAlign: "center" }}>
                {`This brain will detect faces in pictures, just give it a try!`}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input
                        className="f4 br2 pa2 w-70 center"
                        type="text"
                        placeholder="URL"
                        onChange={onInputChange}
                    />
                    <button
                        className=" w-30 br2 grow f4 ph3 pv2 dib white bg-light-purple pointer"
                        onClick={onDetectImage}
                    >
                        Detect
                    </button>
                </div>
            </div>

        </div>

    )
}

export default ImageLinkForm;