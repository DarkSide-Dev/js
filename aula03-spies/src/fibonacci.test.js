const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const assert = require('assert')

; (async () => {

    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        // Generators retornam iterators, (.next)
        // É possível ler os dados usando funções .next, for e rest/spread
        
        for ( const i of fibonacci.execute(3)) {}
        const expectedCallCount = 4;
        assert.deepStrictEqual(spy.callCount, expectedCallCount)
    }
    console.log("- - - -")
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        const [...results] = fibonacci.execute(5)

        const { args } = spy.getCall(2)
        console.log("\nArgs: ", args)
        const expectedResult = [0, 1, 1, 2, 3]
        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
        })

        assert.deepStrictEqual(args, expectedParams)
        assert.deepStrictEqual(results, expectedResult)
    }

})()