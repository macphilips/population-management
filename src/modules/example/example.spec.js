import request from 'supertest';
import app from '../../app';

describe('Example Endpoint', () => {
  test('should hit endpoint', async (done) => {
    const res = await request(app)
      .get('/api/v1/example')
      .set({
        Accept: 'application/json',
      });

    expect(res.status)
      .toEqual(200);
    expect(res.body)
      .toEqual('Successful');
    done();
  });
});
