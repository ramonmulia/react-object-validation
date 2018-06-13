
const REQUIRED_PROPERTIES =
    [
        'method',
        'ruleName',
        'message',
        'isValidWhen'
    ];

const validateObject = fieldsObject => {
    if (typeof fieldsObject !== 'object') {
        throw Error('Form validation must receive an object!');
    }
    Object.keys(fieldsObject)
        .forEach(item => {
            const field = fieldsObject[item];
            if (field.rules === undefined
                || !Array.isArray(field.rules)) {
                throw Error('Rules is required property and it must be an array');
            }

            field.rules.forEach(rule => {
                REQUIRED_PROPERTIES.forEach(
                    property => {
                        if (rule[property] === undefined) {
                            throw Error(`Missing property ${property}`);
                        }
                        if (property === 'method' && typeof rule[property] !== 'function') {
                            throw Error(`mehtod property must be a function`);
                        }
                        if (property === 'ruleName') {
                            if (typeof rule[property] !== 'string') {
                                throw Error(`ruleName property must be a string`);
                            }
                            rule[property] = rule[property].trim().replace(/ /g, '');
                        }
                        if (property === 'message' && typeof rule[property] !== 'string') {
                            throw Error(`message property must be a string`);
                        }
                    }
                )
            })
        });

    return { ...fieldsObject };
}

function generateOutputObject(fields, formFields) {
    return (prev, current) => {
        prev[current] = getRulesObject(fields, current, formFields);
        return prev;
    }
}

function getValidationObject(formFields, current) {
    return (prev, rule) => {
        const isValid = rule.isValidWhen === !!rule.method(formFields[current]);
        prev[rule.ruleName] = {
            isValid,
            message: rule.message
        };
        isValid && delete prev[rule.ruleName].message;
        return prev;
    };
}

function getRulesObject(fields, current, formFields) {
    return fields[current]
        .rules
        .reduce(
            getValidationObject(
                formFields,
                current
            ),
            {}
        );
}

function isFormValid(objectToreturn) {
    return Object.keys(objectToreturn)
        .reduce((prev, current) => {
            prev.push(
                Object.keys(objectToreturn[current])
                    .every(k => !!objectToreturn[current][k].isValid)
            );
            return prev;
        }, [])
        .every(isValid => !!isValid);;
}

class FormValidation {
    constructor(entry) {
        this.fields = validateObject(entry);
    }

    validate(formFields) {
        if (typeof formFields !== 'object') {
            throw Error(`Fields must be an object to validate!`);
        }

        const objectValidated =
            Object.keys(formFields)
                .reduce(
                    generateOutputObject(
                        this.fields,
                        formFields
                    ), {}
                )

        objectValidated.isValid = isFormValid(objectValidated);

        return objectValidated;
    }
}
export default FormValidation;
