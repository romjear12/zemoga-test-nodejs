const { fetchTweetsByUserName } = require('../src/twitter')
const got = require('got')

jest.mock('got')

describe('fetchTweetsByUserName', () => {
    it('wrong call of function (lack of params)', async () => {
        // test response
        const tweets = []

        // mock return
        got.get.mockReturnValue({
            json: () => Promise.resolve(tweets),
        })

        // lack of params
        await expect(fetchTweetsByUserName()).rejects.toThrow(
            'bearerToken and username params are required',
        )
    })
    it('should return tweets list', async () => {
        // test response
        const tweets = [
            {
                id_str: '1527691528071565312',
                text: 'Today we are launching the reverse-chronological home timeline on the Twitter API v2. https://t.co/eLFKqdCou1',
            },
            {
                id_str: '352769152324324342',
                text: 'Today we are launching the reverse-chronol',
            },
        ]

        // mock return
        got.get.mockReturnValue({
            json: () => Promise.resolve(tweets),
        })

        const result = await fetchTweetsByUserName('test_bearertoken', 'test_username')
        expect(result).toEqual(tweets)
    })
    it('should return empty tweets list', async () => {
        // test response
        const tweets = []

        // mock return
        got.get.mockReturnValue({
            json: () => Promise.resolve(tweets),
        })

        const result = await fetchTweetsByUserName('test_bearertoken', 'test_username')

        expect(result).toHaveLength(0)
    })
})
