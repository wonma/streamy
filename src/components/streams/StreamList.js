import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams(); //API로부터받아와 state에 streams담음
    }

    renderAdmin = (stream) => {
        if(stream.userId === this.props.auth.userId) {
            return (
                <div className="right floated content">
                    <Link className="ui primary button" to={`streams/edit/${stream.id}`}>Edit</Link>
                    <Link className="ui button" to={`streams/delete/${stream.id}`}>DELETE</Link>
                </div>
            );
        }
    }

    renderList = () => {
        return this.props.streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large play circle outline middle aligned icon"></i>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`}>
                            <div className="header">{stream.title}</div>
                        </Link>
                        {stream.description}
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        return (
            <div style={{textAlign: "right"}}>
                <Link to="/streams/new" className="ui primary button">Create Stream</Link>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="ui celled relaxed list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return { 
        streams: _.values(state.streams),
        auth: state.auth
     };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);