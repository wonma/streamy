import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions/index';
import StreamForm from './StreamForm';


class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id); 
        // 특정 id의 스트림을 http request로 불러와 streams state에 넣어둔다.
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if(!this.props.stream) { // render시작되는 부분은 항상 조심. fetch Data이전에 초기 렌더 발생하므로.
            return <div>Loading....</div>;
        }

        return (
            <div>
                <h3>Edit Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')} 
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
    // streams state에 담겨있는 stream object를 꺼내와 StreamEdit Component에 공급해준다.
    // 이 작업은 initial Value를 채워넣기위함이다.
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);