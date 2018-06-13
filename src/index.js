import React, { Component } from 'react';
import FormValidation from './formValidation';

export default function FormValidationHOC(fieldsRules, WrappedComponent) {
    return class extends Component {
        render() {
            return <WrappedComponent
                {...this.props}
                formValidation={new FormValidation(fieldsRules)}
            />;
        }
    }
}
