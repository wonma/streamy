import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchStream(id);
        this.buildPlayer(id);

    }

    componentDidUpdate() {
        const { id } = this.props.match.params
        this.buildPlayer(id);
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer = (id) => {
        if (this.player || !this.props.stream) {
            return null;
        }

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();

    }

    render() {
        // this.videoRef.current는 video element정보 갖고있음
        if (!this.props.stream) {
            return null;
        } 
        const { title, description } = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{ width:'100%' }} controls />
                <div>{title}</div>
                <div>{description}</div>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);