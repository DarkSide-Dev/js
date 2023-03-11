const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
;
(async () => {
    // Test 1
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    // Test 2
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    // Test 3
    {
        const filePath = './mocks/invalid-header.csv'
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    // Test 4
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "name": "João",
                "id": 123,
                "profession": "Web Developer",
                "birthDay": 2003
            },
            {
                "name": "Nicoly",
                "id": 321,
                "profession": "Designer",
                "birthDay": 2004
            },
            {
                "name": "Henrique",
                "id": 213,
                "profession": "Web Developer",
                "birthDay": 2003
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})();