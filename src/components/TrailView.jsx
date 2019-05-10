import React from 'react';
import "./styles/TrailView.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltUp, faLongArrowAltDown, faStar} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import ConditionReport from "./ConditionReport";

export default class TrailView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reports: [],
        };

        this.trailViewRef = React.createRef();

        this.getIcon = {
            "trailrun": require('../assets/trailrunicon.svg'),
            "mtb": require('../assets/mtbicon.svg'),
            "hiking": require('../assets/hikingicon.svg'),
        };
    }

    handleClick = e => {
        if (!this.trailViewRef.current.contains(e.target)) {
            this.props.setTrailView(false);
        }
    };

    componentDidMount() {
        axios({
            method: 'get',
            url: `https://www.${this.props.trail.source}project.com/data/get-conditions`,
            params: {
                ids: this.props.trail.id,
                key: "7024512-867f645d37de30f2bc0144d8dc5bc776",
            }
        })
            .then(response => {
                const reports = [];

                for (let k in response.data) {
                    if (k !== 'success') {
                        reports.push(response.data[k]);
                    }
                }
                this.setState({
                    reports: reports,
                })
            })
    }

    render() {
        return (
            <div className={'background'} onClick={this.handleClick}>
                <div className={'modal'}>
                    <div className="trailView" ref={this.trailViewRef}>
                        {this.props.trail.imgMedium && <img src={this.props.trail.imgMedium} alt={"Trail"}/>}
                        <div>
                            <div>
                                <img src={this.getIcon[this.props.trail.source]} alt={'source icon'}/>
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
                            <a href={this.props.trail.url} target={"_blank"}>See Trail</a>
                        </div>
                        <div>
                            <h4>Latest Trail Report</h4>
                            {this.state.reports.map(report => {
                                return <ConditionReport report={report}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
