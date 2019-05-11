import React from 'react';
import axios from 'axios';
import './App.scss';
import TrailsMap from "./components/Map";
import SearchBar from "./components/SearchBar";
import TrailView from "./components/TrailView";
import TrailCardContainer from "./components/TrailCardContainer";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapLocation: {
                lat: "39.400720",
                lng: "-107.215337",
            },
            queryLocation: {
                lat: "39.400720",
                lng: "-107.215337",
            },
            maxDistance: 50,
            trails: [],
            sources: ['trailrun'],
            searchConditions: ['All Clear'],
            trailView: false,
            sortBy: '',
            loading: false,
        }
    }

    setTrailView = trail => {
        this.setState({
            trailView: trail,
        })
    };

    handleSubmit = () => {
        this.setState({
            loading: true,
        }, () => {
            Promise.all(
                this.state.sources.map(source => {
                    return axios({
                        method: 'get',
                        url: `https://www.${source}project.com/data/get-trails`,
                        params: {
                            lat: this.state.queryLocation.lat,
                            lon: this.state.queryLocation.lng,
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
                        loading: false,
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
        });
    };

    handleLatChange = e => {
        this.setState(prevState => {
            return {
                queryLocation: {
                    lat: e.target.value,
                    lng: prevState.queryLocation.lng,
                }
            }
        })
    };

    handleLngChange = e => {
        this.setState(prevState => {
            return {
                queryLocation: {
                    lat: prevState.queryLocation.lat,
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
            queryLocation: {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            }
        })
    };

    handleSortBy = () => {
        if (this.state.sortBy) {
            this.setState(() => {
                const sortedTrails = this.state.trails.sort((a, b) => {
                    if (this.state.sortBy === 'distance_asc') {
                        return a.length - b.length;
                    } else if (this.state.sortBy === 'distance_desc') {
                        return b.length - a.length;
                    } else {
                        return b.stars - a.stars;
                    }
                });
                return {
                    trails: sortedTrails,
                }
            })
        }
    };

    handleSortByChange = e => {
        this.setState({
            sortBy: e.target.value,
        })
    };

    render() {
        return (
            <div>
                {this.state.trailView && <TrailView trail={this.state.trailView} setTrailView={this.setTrailView}/>}

                <TrailsMap mapLocation={[this.state.mapLocation.lat, this.state.mapLocation.lng]}
                           queryLocation={[this.state.queryLocation.lat, this.state.queryLocation.lng]}
                           handleClick={this.handleMapClick}
                           trails={this.state.trails}
                           setTrailView={this.setTrailView}
                />
                <SearchBar
                    handleLatChange={this.handleLatChange}
                    handleLngChange={this.handleLngChange}
                    handleSubmit={this.handleSubmit}
                    location={this.state.queryLocation}
                    maxDistance={this.state.maxDistance}
                    handleMaxDistanceChange={this.handleMaxDistanceChange}
                    sources={this.state.sources}
                    handleSourcesChange={this.handleSourcesChange}
                    searchConditions={this.state.searchConditions}
                    handleConditionsChange={this.handleConditionsChange}
                    loading={this.state.loading}
                />
                {this.state.trails.length > 0 && <div className={'sortByContainer'}>
                    Sort by <select value={this.state.sortBy} onChange={this.handleSortByChange}>
                    <option value={""}> </option>
                    <option value={'distance_asc'}>Distance (Asc)</option>
                    <option value={'distance_desc'}>Distance (Desc)</option>
                    <option value={'rating'}>Rating</option>
                </select>
                    <button onClick={this.handleSortBy}>Go</button>
                </div>}
                <TrailCardContainer trails={this.state.trails} setTrailView={this.setTrailView}/>
            </div>
        )
    }
}
