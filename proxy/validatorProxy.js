const validators = {
    number: {
        greaterThan: expectedValue => value => value > expectedValue,
        isNumber: () => value => Number(value) === value,
    },
    string: {
        isString: () => value => String(value) === value,
        longerThan: expectedLength => value => value.length > expectedLength,
    }
}

const withValidation = (object, schema) => {
    return new Proxy(object, {
        set(target, key, value) {
            const validators = schema[key];
            
            if (!validators || !validators.length) {
                target[key] = value;
                return true;
            }
            
            const shouldSet = validators.every(validator => validator(value));
            
            if (!shouldSet) return false;

            target[key] = value;
            return true;
        }
    })
}

const person = {
    firstName: "Dan",
    lastName: "Cane",
    age: 40,
};

const personWithValidation = withValidation(person, {
    firstName: [validators.string.isString(), validators.string.longerThan(3)],
    lastName: [validators.string.isString(), validators.string.longerThan(7)],
    age: [validators.number.isNumber(), validators.number.greaterThan(41)],
});

console.log(personWithValidation);
personWithValidation.age = 42;
console.log(personWithValidation);