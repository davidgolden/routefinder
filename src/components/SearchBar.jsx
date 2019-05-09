import React from 'react';

const SearchBar = props => {
    return <div>
        <label htmlFor={'lat'}>Latitude</label>
        <input onChange={props.handleLatChange} name={'lat'} value={props.location.lat}/>

        <label htmlFor={'lng'}>Longitude</label>
        <input onChange={props.handleLatChange} name={'lng'} value={props.location.lng}/>

        <label htmlFor={'maxDistance'}>Search Radius</label>
        <input type={'number'} value={props.maxDistance} onChange={props.handleMaxDistanceChange} />

        <div>
            <label htmlFor={'trailrun'}>Trail Run Project</label>
            <input onChange={props.handleSourcesChange} type={'checkbox'} checked={props.sources.includes('trailrun')} value={'trailrun'} />

            <label htmlFor={'mtb'}>MTB Project</label>
            <input onChange={props.handleSourcesChange} type={'checkbox'} checked={props.sources.includes('mtb')} value={'mtb'} />

            <label htmlFor={'hiking'}>Hiking Project</label>
            <input onChange={props.handleSourcesChange} type={'checkbox'} checked={props.sources.includes('hiking')} value={'hiking'} />
        </div>

        <div>
            <label htmlFor={'Unknown'}>Unknown</label>
            <input onChange={props.handleConditionsChange} type={'checkbox'} checked={props.searchConditions.includes('Unknown')} value={'Unknown'} />

            <label htmlFor={'All Clear'}>All Clear</label>
            <input onChange={props.handleConditionsChange} type={'checkbox'} checked={props.searchConditions.includes('All Clear')} value={'All Clear'} />

            <label htmlFor={'Minor Issues'}>Minor Issues</label>
            <input onChange={props.handleConditionsChange} type={'checkbox'} checked={props.searchConditions.includes('Minor Issues')} value={'Minor Issues'} />

            <label htmlFor={'Bad / Closed'}>Bad / Closed</label>
            <input onChange={props.handleConditionsChange} type={'checkbox'} checked={props.searchConditions.includes('Bad / Closed')} value={'Bad / Closed'} />
        </div>

        <button onClick={props.handleSubmit}>Submit</button>
    </div>
};

export default SearchBar
