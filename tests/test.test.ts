import { testFunction } from '../src/function'

describe('Test a index function', () => {
    it('shoudl return 2', async () => {
        expect(testFunction()).toEqual(2)
    })
})
