import React from 'react';
import TrailCard from "./TrailCard";
import "../App.scss";

export default class TrailCardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            page_size: 20,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.trails !== this.props.trails) {
            this.setState({
                page: 1,
            })
        }
    }

    handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        const windowSize = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;
        const distanceToBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0);
        if (distanceToBottom < 100) {
            this.setState(prevState => {
                return {
                    page: prevState.page + 1,
                };
            })
        }
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { passive: true })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div className={'trailCardContainer'}>
                {this.props.trails
                    .slice(0, (this.state.page * this.state.page_size))
                    .map((trail, index) => {
                        return <TrailCard key={`${trail.id}${index}`} trail={trail} setTrailView={this.props.setTrailView}/>
                    })}
            </div>
        )
    }
}

// const TrailCardContainer = props => {
//     return (
//         <div className={'trailCardContainer'}>
//             {props.trails
//                 .map((trail, index) => {
//                     return <TrailCard key={index} trail={trail} setTrailView={props.setTrailView}/>
//                 })}
//         </div>
//     )
// };
//
// export default TrailCardContainer;
