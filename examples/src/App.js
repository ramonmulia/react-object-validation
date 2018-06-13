import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FormValidationHOC from 'react-object-validation';

console.log(FormValidationHOC);
class App extends Component {
  state = {
    form: {
      name: ''
    },
    formValidation: {}
  };

  handleButton = () => {
    this.setState({
      formValidation: this.props.formValidation.validate(this.state.form)
    });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        name: e.target.value
      }
    })
  }

  renderErrorMessages() {
    return Object.keys(this.state.formValidation)
      .map(field => {
        return Object.keys(this.state.formValidation[field])
          .map(key => {
            if (!this.state.formValidation[field][key].isValid) {
              return <li key={`${field}-${key}`}>
                {this.state.formValidation[field][key].message}
              </li>
            }
          });
      })
  }

  render() {
    const { formValidation } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <input
            type='text'
            value={this.state.form.name}
            onChange={this.handleChange}
          />
          <ul>
            {this.renderErrorMessages()}
          </ul>
          <button onClick={this.handleButton}>click</button>
        </div>
      </div>
    );
  }
}

const fieldRules = {
  name: {
    rules: [
      {
        ruleName: 'firstLetterUpperCase',
        message: 'Must has first letter UpperCase',
        isValidWhen: true,
        method: name => {
          if (name) {
            return name.split('')[0] === name.split('')[0].toUpperCase();
          }
        }
      },
      {
        ruleName: 'isEmpty',
        message: 'Name is Empty',
        isValidWhen: false,
        method: name => {
          return name === ''
        }
      }
    ]
  }
};

export default FormValidationHOC(fieldRules, App);
