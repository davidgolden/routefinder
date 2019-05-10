import React from 'react';
import axios from 'axios';
import './App.scss';
import TrailCard from "./components/TrailCard";
import TrailsMap from "./components/Map";
import SearchBar from "./components/SearchBar";
import TrailView from "./components/TrailView";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: {
                lat: "39.400720",
                lng: "-107.215337",
            },
            maxDistance: 100,
            trails: [],
            sources: ['trailrun', 'mtb', 'hiking'],
            searchConditions: ['All Clear'],
            trailView: false,
        }
    }

    setTrailView = trail => {
        this.setState({
            trailView: trail,
        })
    };

    handleSubmit = () => {
        Promise.all(
            this.state.sources.map(source => {
                return axios({
                    method: 'get',
                    url: `https://www.${source}project.com/data/get-trails`,
                    params: {
                        lat: this.state.location.lat,
                        lon: this.state.location.lng,
                        maxDistance: 100,
                        maxResults: 500,
                        key: "7024512-867f645d37de30f2bc0144d8dc5bc776",
                    }
                })
            })
        )
            .then(response => {
                const sources = {
                    trailrun: "trailrun",
                    mtb: "mtb",
                    hiking: "hiking",
                };

                let trails = [];
                for (let i = 0; i < response.length; i++) {
                    trails = trails.concat(response[i].data.trails);
                }

                this.setState({
                    trails: trails
                        .filter(trail => this.state.searchConditions.includes(trail.conditionStatus))
                        .map(trail => {
                            for (let k in sources) {
                                if (trail.url.includes(k)) {
                                    trail.source = sources[k];
                                }
                            }
                            return trail;
                        })
                })
            })
    };

    handleLatChange = e => {
        this.setState(prevState => {
            return {
                location: {
                    lat: e.target.value,
                    lng: prevState.location.lng,
                }
            }
        })
    };

    handleLngChange = e => {
        this.setState(prevState => {
            return {
                location: {
                    lat: prevState.location.lat,
                    lng: e.target.value,
                }
            }
        })
    };

    handleMaxDistanceChange = e => {
        this.setState({
            maxDistance: e.target.value,
        })
    };

    handleSourcesChange = e => {
        const target = e.target;
        this.setState(prevState => {
            let sources = prevState.sources;
            if (sources.includes(target.value)) {
                return {
                    sources: sources.filter(source => source !== target.value)
                }
            } else {
                sources.push(target.value);
                return {
                    sources: sources,
                }
            }
        })
    };

    handleConditionsChange = e => {
        const target = e.target;
        this.setState(prevState => {
            let searchConditions = prevState.searchConditions;
            if (searchConditions.includes(target.value)) {
                return {
                    searchConditions: searchConditions.filter(source => source !== target.value)
                }
            } else {
                searchConditions.push(target.value);
                return {
                    searchConditions: searchConditions,
                }
            }
        })
    };

    handleMapClick = e => {
        this.setState({
            location: {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            }
        })
    };

    // imgMedium: "https://cdn-files.apstatic.com/hike/7000658_medium_1554159500.jpg"
    // imgSmall: "https://cdn-files.apstatic.com/hike/7000658_small_1554159500.jpg"
    // imgSmallMed: "https://cdn-files.apstatic.com/hike/7000658_smallMed_1554159500.jpg"
    // imgSqSmall: "https://cdn-files.apstatic.com/hike/7000658_sqsmall_1554159500.jpg"

    render() {
        return (
            <div>
                {this.state.trailView && <TrailView trail={this.state.trailView} setTrailView={this.setTrailView} />}

                <TrailsMap position={[this.state.location.lat, this.state.location.lng]}
                           handleClick={this.handleMapClick}
                           trails={this.state.trails}
                           setTrailView={this.setTrailView}
                />
                <SearchBar
                    handleLatChange={this.handleLatChange}
                    handleLngChange={this.handleLngChange}
                    handleSubmit={this.handleSubmit}
                    location={this.state.location}
                    maxDistance={this.state.maxDistance}
                    handleMaxDistanceChange={this.handleMaxDistanceChange}
                    sources={this.state.sources}
                    handleSourcesChange={this.handleSourcesChange}
                    searchConditions={this.state.searchConditions}
                    handleConditionsChange={this.handleConditionsChange}
                />

                <p>NOTE: This app uses entirely data from <a href="www.trailrunproject.com" target={"_blank"}>Trail Run
                    Project</a>, <a
                    href="www.mtbproject.com" target={"_blank"}>MTB Project</a>, and <a href={"www.hikingproject.com"}
                                                                                        target={"_blank"}>Hiking
                    Project</a>.
                    Because these sites do not directly allow for querying data by trail condition, this app functions
                    by finding up to 500 trails which meet the search criteria and then filtering these trails by
                    condition. If more than 500 trails meet the search criteria, not all matching trails will be
                    returned!
                </p>
                <div className={'trailCardContainer'}>
                    {this.state.trails
                        .map(trail => {
                            return <TrailCard trail={trail} setTrailView={this.setTrailView}/>
                        })}
                </div>
            </div>
        )
    }
}
