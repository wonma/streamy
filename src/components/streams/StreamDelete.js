import React from 'react';
import { deleteStream, fetchStream } from '../../actions/index';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';


class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id);
    }

    renderContent = () => {
        if (this.props.stream) {
            return (
                <div>
                    <p>Do you want to delete this stream?</p>
                    <p>{this.props.stream.title}</p>
                </div>
            )
        } else {
            return (
                <p>Do you want to delete this stream?</p>
            )
        }
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button onClick={this.onDelete} className="ui red button">DELETE</button>
                <button onClick={() => history.push('/')} className="ui button">CANCEL</button>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div>
                Delete Stream
                <Modal 
                    title="this is title"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);