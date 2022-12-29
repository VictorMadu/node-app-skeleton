import request from 'superagent';

describe('test for Post controllers', () => {
    test('POST /v1/post', async () => {
        const response = await request.post('/v1/posts');
    });
});
