import React, {useState} from 'react';
import Review from '../Review/Review';
import './Joke.css';

function Joke (props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="joke">
            <div className="joke-flex">
                <div className="index">
                    <h2>{props.index}</h2>
                </div>
                <div className="content">
                    <h3>{props.joke}</h3>
                    <div className="star-container avg-rating">
                        <i className={"fa-star " + (props.stars > 0 ? "fas" : "far")}></i>
                        <i className={"fa-star " + (props.stars > 1 ? "fas" : "far")}></i>
                        <i className={"fa-star " + (props.stars > 2 ? "fas" : "far")}></i>
                        <i className={"fa-star " + (props.stars > 3 ? "fas" : "far")}></i>
                        <i className={"fa-star " + (props.stars > 4 ? "fas" : "far")}></i>
                        <span>{props.stars}/5 - {props.count > 1 ? props.count + " reviews" : "1 review"}</span>
                    </div>
                </div>
                <div className="chevron">
                    <i
                        className={expanded ? "fas fa-chevron-up" : "fas fa-chevron-down"}
                        onClick={() => {setExpanded(!expanded)}}></i>
                </div>
            </div>
            {expanded ? 
                <div>
                    {props.reviews.map((r, i) => {
                        return (
                            <div className="joke-review-container">
                                <Review
                                stars={r.stars}
                                message={r.message}
                                name={r.name}
                                timestamp={r.timestamp}
                                key={r.timestamp + "-" + i} />
                            </div>
                        );
                    })}
                </div>
            : ""}
        </div>
    );
}

export default Joke;