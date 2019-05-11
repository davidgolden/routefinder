import React from 'react';
import "./styles/SearchBar.scss";

import {ReactComponent as TrailRunLogo} from '../assets/trailrunlogo.svg';
import {ReactComponent as MTBLogo} from '../assets/mtblogo.svg';
import {ReactComponent as HikingLogo} from '../assets/hikinglogo.svg';

const SearchBar = props => {

    return <div className={'searchBarContainer'}>
        <div className={'locationContainer'}>
            <div>
                <label htmlFor={'lat'}>Latitude</label>
                <input onChange={props.handleLatChange} name={'lat'} value={props.location.lat}/>
            </div>

            <div>
                <label htmlFor={'lng'}>Longitude</label>
                <input onChange={props.handleLatChange} name={'lng'} value={props.location.lng}/>
            </div>

            <div>
                <label htmlFor={'maxDistance'}>Search Mile Radius</label>
                <input type={'number'} value={props.maxDistance} onChange={props.handleMaxDistanceChange}/>
            </div>
        </div>

        <div className={'sourceContainer'}>
            <h3>Data Sources</h3>
            <label htmlFor={'trailrun'} aria-label={'trail run project'}>
                <TrailRunLogo/>
            </label>
            <input onChange={props.handleSourcesChange} type={'checkbox'} checked={props.sources.includes('trailrun')}
                   id='trailrun' value={'trailrun'}/>

            <label htmlFor={'mtb'} aria-label={'mountain bike project'}>
                <MTBLogo/>
            </label>
            <input onChange={props.handleSourcesChange} type={'checkbox'} checked={props.sources.includes('mtb')}
                   value={'mtb'} id={'mtb'}/>

            <label htmlFor={'hiking'} aria-label={'hiking project'}>
                <HikingLogo/>
            </label>
            <input onChange={props.handleSourcesChange} type={'checkbox'} checked={props.sources.includes('hiking')}
                   value={'hiking'} id={'hiking'}/>
        </div>

        <div className={'conditionContainer'}>
            <h3>Filter by Condition</h3>
            <label htmlFor={'Unknown'}>Unknown</label>
            <input onChange={props.handleConditionsChange} type={'checkbox'}
                   checked={props.searchConditions.includes('Unknown')} value={'Unknown'} id={'Unknown'}/>

            <label htmlFor={'All Clear'}>All Clear</label>
            <input onChange={props.handleConditionsChange} type={'checkbox'}
                   checked={props.searchConditions.includes('All Clear')} value={'All Clear'} id={'All Clear'}/>

            <label htmlFor={'Minor Issues'}>Minor Issues</label>
            <input onChange={props.handleConditionsChange} type={'checkbox'}
                   checked={props.searchConditions.includes('Minor Issues')} value={'Minor Issues'}
                   id={'Minor Issues'}/>

            <label htmlFor={'Bad / Closed'}>Bad / Closed</label>
            <input onChange={props.handleConditionsChange} type={'checkbox'}
                   checked={props.searchConditions.includes('Bad / Closed')} value={'Bad / Closed'}
                   id={'Bad / Closed'}/>
        </div>
        <div>
            <button className={props.loading ? 'submitButtonDisabled' : ''} onClick={props.handleSubmit}>Submit</button>
        </div>

        <small>NOTE: This app is powered by data from <a href="www.trailrunproject.com" target={"_blank"}>Trail Run
            Project</a>, <a
            href="www.mtbproject.com" target={"_blank"}>MTB Project</a>, and <a href={"www.hikingproject.com"}
                                                                                target={"_blank"}>Hiking
            Project</a>.
            These sites don't allow for querying data by trail condition, so this app finds up to 500 trails which meet
            the search criteria and then filters by
            condition. If more than 500 trails are found, not all matching trails will be
            shown!
        </small>
    </div>
};

export default SearchBar
