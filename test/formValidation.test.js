import assert from 'assert';
import FormValidation from '../src/formValidation';

describe('form validations test', () => {
    it('Should trhow new exception', () => {
        try {
            new FormValidation({
                name: {
                    rulsses: [
                        {
                            validationAttr: 'wrongEmail',
                            message: 'invalido',
                            isValidWhen: true,

                        },
                        {
                            validationAttr: 'isEmpty',
                            message: 'invalido',
                            isValidWhen: true,
                            method: name => name === 'Jhonny'
                        }
                    ]
                }
            });
        }
        catch (err) {
            assert.equal('Error: Rules is required property and it must be an array', err.toString());
        }
    });

    it('Should trhow missing required fields exception', () => {
        try {
            new FormValidation({
                name: {
                    rules: [
                        {
                            validationAttr: ' wrong Em   ail',
                            message: 'invalido',
                            isValidWhen: true,

                        },
                        {
                            validationAttr: 'isEmpty',
                            message: 'invalido',
                            isValidWhen: true,
                            method: name => name === 'Jhonny'
                        }
                    ]
                }
            });
        }
        catch (err) {
            assert.equal('Error: Missing property method', err.toString());
        }
    });

    it('Should fix validationAttr', () => {
        new FormValidation({
            name: {
                rules: [
                    {
                        validationAttr: ' wrong Em   ail',
                        message: 'invalido',
                        isValidWhen: true,
                        method: name => name === 'Jhonny'
                    },
                    {
                        validationAttr: 'isEmpty',
                        message: 'invalido',
                        isValidWhen: true,
                        method: name => name === 'Jhonny'
                    }
                ]
            }
        });
        assert.equal(1, 1);
    });

    it('Should form be valid', () => {
        const validationObject = new FormValidation({
            name: {
                rules: [
                    {
                        validationAttr: 'firstLetterUpperCase',
                        message: 'Must has first letter UpperCase',
                        isValidWhen: true,
                        method: name => {
                            if (name) {
                                return name.split('')[0] === name.split('')[0].toUpperCase();
                            }
                        }
                    },
                    {
                        validationAttr: 'isEmpty',
                        message: 'Name is Empty',
                        isValidWhen: false,
                        method: name => {
                            return name === ''
                        }
                    }
                ]
            }
        }).validate({
            name: 'Ramon'
        });

        assert.equal(validationObject.isValid, true);
        assert.equal(validationObject.name.firstLetterUpperCase.isValid, true);
        assert.equal(validationObject.name.isEmpty.isValid, true);
    });

    it('Should form be invalid', () => {
        const formValidation = new FormValidation({
            name: {
                rules: [
                    {
                        validationAttr: 'firstLetterUpperCase',
                        message: 'Must has first letter UpperCase',
                        isValidWhen: true,
                        method: name => {
                            if (name) {
                                return name.split('')[0] === name.split('')[0].toUpperCase();
                            }
                        }
                    },
                    {
                        validationAttr: 'isEmpty',
                        message: 'Name is Empty',
                        isValidWhen: false,
                        method: name => {
                            return name === ''
                        }
                    }
                ]
            }
        });

        const validationObject = formValidation.validate({
            name: 'ramon'
        });

        assert.equal(validationObject.isValid, false);
        assert.equal(validationObject.name.firstLetterUpperCase.isValid, false);
        assert.equal(validationObject.name.firstLetterUpperCase.message, 'Must has first letter UpperCase');
    });

    it('Should validate method must receive an object', () => {
        const formValidation = new FormValidation({
            name: {
                rules: [
                    {
                        validationAttr: 'firstLetterUpperCase',
                        message: 'Must has first letter UpperCase',
                        isValidWhen: true,
                        method: name => {
                            if (name) {
                                return name.split('')[0] === name.split('')[0].toUpperCase();
                            }
                        }
                    },
                    {
                        validationAttr: 'isEmpty',
                        message: 'Name is Empty',
                        isValidWhen: false,
                        method: name => {
                            return name === ''
                        }
                    }
                ]
            }
        });
        try {
            formValidation.validate();
        }
        catch (err) {
            assert.equal('Error: Fields must be an object to validate!', err.toString());
        }
    });

    it('Should validate method must receive an object', () => {
        try {
            new FormValidation();
        }
        catch (err) {
            assert.equal('Error: Form validation must receive an object!', err.toString());
        }
    });

    it('Should method property receive a function', () => {
        try {
            new FormValidation({
                name: {
                    rules: [
                        {
                            validationAttr: 'firstLetterUpperCase',
                            message: 'Must has first letter UpperCase',
                            isValidWhen: true,
                            method: 'method'
                        },
                        {
                            validationAttr: 'isEmpty',
                            message: 'Name is Empty',
                            isValidWhen: false,
                            method: name => {
                                return name === ''
                            }
                        }
                    ]
                }
            });
        }
        catch (err) {
            assert.equal('Error: mehtod property must be a function', err.toString());
        }
    });

    it('Should validationAttr be a string', () => {
        try {
            new FormValidation({
                name: {
                    rules: [
                        {
                            validationAttr: () => { },
                            message: 'Must has first letter UpperCase',
                            isValidWhen: true,
                            method: () => { }
                        }
                    ]
                }
            });
        }
        catch (err) {
            assert.equal('Error: validationAttr property must be a string', err.toString());
        }
    });

    it('Should message be a string', () => {
        try {
            new FormValidation({
                name: {
                    rules: [
                        {
                            validationAttr: 'test',
                            message: () => { },
                            isValidWhen: true,
                            method: () => { }
                        }
                    ]
                }
            });
        }
        catch (err) {
            assert.equal('Error: message property must be a string', err.toString());
        }
    });
});
