import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError = ({ error, touched }) => {
        if (error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
                <Field name="title" component={this.renderInput} label="title" />
                <Field name="description" component={this.renderInput} label="description" />
                <button className="ui primary button">Submit</button>
            </form>
        );
    }
};

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'Enter Title'
    }

    if (!formValues.description) {
        errors.description = 'Enter Description'
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);