import React from 'react';
import "./Review.css";

function Review(props) {
    return (
        <div className="review">
            <div className="star-container">
                <i className={"fa-star " + (props.stars > 0 ? "fas" : "far")}></i>
                <i className={"fa-star " + (props.stars > 1 ? "fas" : "far")}></i>
                <i className={"fa-star " + (props.stars > 2 ? "fas" : "far")}></i>
                <i className={"fa-star " + (props.stars > 3 ? "fas" : "far")}></i>
                <i className={"fa-star " + (props.stars > 4 ? "fas" : "far")}></i>
            </div>
            <div className="message">
                <p>{props.message}</p>
            </div>
            <div className="name">
                <p>{props.name.length > 0 ? props.name : "An anonymous joke critic"}</p>
            </div>
            <div className="timestamp">
                <p>{props.timestamp.toLocaleString()}</p>
            </div>
        </div>
    );
}

export default Review;