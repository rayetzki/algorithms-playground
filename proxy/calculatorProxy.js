class Calculator {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
}

const executeOperations = (operations, args) => {
    return operations.reduce((args, method) => [method(...args)], args);
};

const $ = Symbol('RESULT_ARGUMENT');

const lazify = (instance) => {
    const operations = [];

    const proxy = new Proxy(instance, {
        get(target, propKey) {
            const propertyOrMethod = target[propKey];

            if (propKey === 'run') {
                return (...args) => executeOperations(operations, args)[0];
            }

            if (!propertyOrMethod) {
                throw new Error('No property found.');
            }

            if (typeof propertyOrMethod !== 'function') {
                return target[propKey];
            }

            return (...args) => {
                operations.push(internalResult => {
                    return propertyOrMethod.apply(
                        target,
                        [...args].map(arg => (arg === $ ? internalResult : arg))
                    )
                });

                return proxy;
            };
        },
    });

    return proxy;
};

const lazyCalculator = lazify(new Calculator());

const a = lazyCalculator
 .add(5, 10)
 .subtract($, 5)
 .multiply($, 10);

console.log(a.run());
