import React from 'react';
import "./styles/TrailView.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltUp, faLongArrowAltDown, faStar} from "@fortawesome/free-solid-svg-icons";
import ConditionReport from "./ConditionReport";
import {getIcon, getWebsite} from "./utils";
import TrailsMap from "./Map";

export default class TrailView extends React.Component {
    constructor(props) {
        super(props);

        this.trailViewRef = React.createRef();
    }

    handleClick = e => {
        if (!this.trailViewRef.current.contains(e.target)) {
            this.props.setTrailView(false);
        }
    };

    render() {
        const SourceIcon = () => getIcon[this.props.trail.source];

        return (
            <div className={'background'} onClick={this.handleClick}>
                <div className={'modal'}>
                    <div className="trailView" ref={this.trailViewRef}>
                        {this.props.trail.imgMedium && <img src={this.props.trail.imgMedium} alt={"Trail"}/>}
                        <div>
                            <div>
                                <SourceIcon/>
                                <h2>{this.props.trail.name}</h2>
                            </div>
                            <h3>{this.props.trail.location}, {this.props.trail.length}mi</h3>
                            <h4>{this.props.trail.summary}</h4>
                            <p>
                                <FontAwesomeIcon icon={faLongArrowAltUp}/> {this.props.trail.ascent}' up
                                to {this.props.trail.high}'
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faLongArrowAltDown}/> {this.props.trail.descent}' down
                                to {this.props.trail.low}'
                            </p>
                            <p>
                                {this.props.trail.stars} <FontAwesomeIcon
                                icon={faStar}/> of {this.props.trail.starVotes} reviews
                            </p>
                            <a href={this.props.trail.url} target={"_blank"}>See Trail
                                on {getWebsite[this.props.trail.source]}</a>
                        </div>
                        <div>
                            <h4>Latest Trail Report</h4>
                            <ConditionReport
                                conditionStatus={this.props.trail.conditionStatus}
                                conditionDate={this.props.trail.conditionDate}
                                conditionDetails={this.props.trail.conditionDetails}
                            />
                        </div>

                        <TrailsMap
                            queryLocation={[this.props.trail.latitude, this.props.trail.longitude]}
                            mapLocation={[this.props.trail.latitude, this.props.trail.longitude]}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
