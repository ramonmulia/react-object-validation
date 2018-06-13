## react-form-validation

Simple way to define rules to test your forms or any set of objects in react.


### The problem

You have a form object and you want to create rules to validate each of its properties, sometimes more than one rule for each property.
You want that some method called can return if the property was setted corretly or not
and if it wasn't you want display an error message for each rule broken.


### The solution

react-form-validation can help with that! The motivation was create a simple way to decorate a react component passing as a props a method
to validate some object form according with rules specified.

### Installation

```sh
$ npm install react-form-validation --save
```

### Usage

```sh 
import React, { Component } from 'react'
import FormValidationHOC from 'react-form-validation'

class App extends Component {
    state = {
        form: {
            name: ''
        }
        formValidation: {}
    };

    handleChange = e => 
        this.setState({
            form: {
            name: e.target.value
            }
        });

     handleOnClickButton = () =>
        this.setState({
            formValidation: this.props.formValidation.validate(this.state.form)
        });

     render() {
        const nameValidation = this.state.formValidation.name;
        <div>
          <input
            type='text'
            value={this.state.form.name}
            onChange={this.handleChange}
          />
          <div>
                {!nameValidation.isEmpty.isValid ? nameValidation.message : ''}
          </div>
          <button onClick={this.handleOnClickButton}>click</button>
        </div>
     }
}

const fieldRules = {
  name: {
    rules: [
      {
        ruleName: 'isEmpty',
        message: 'Name field is Empty',
        isValidWhen: false,
        method: name => name === ''
      }
    ]
  }
};

export default FormValidationHOC(fieldRules, App);

```

### Properties

| Name | Meaning | type | is Required |
| ------ | ------ | ------ | ------ |
| ruleName | Validation name that will be converted to a property | string | true
| message | Error message when is not valid | string | true
| isValidWhen | Property to validate the method's return is valid | boolean | true
| method | Function to validate the field | function | true

