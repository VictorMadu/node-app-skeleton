import supertest from 'supertest';
import { closeApp, startApp } from '../../../src/application';
import RequestHandler from '../../../src/application/request-handlers/request-handler';
import RequestHandlerManager from '../../../src/application/request-handlers/request-handler-manager';
import DependencyInjector from '../../../src/common/dependency-injector';

describe('test for Post controllers', () => {
    const DI = DependencyInjector.Container;
    let app: (request: any, response: any) => any;

    beforeAll(async () => {
        await startApp(DI);
        app = DI.getInstance(RequestHandlerManager).getHandler();
    });

    afterAll(async () => {
        await closeApp(DI);
    });

    describe('test for POST /v1/posts', () => {
        let response: supertest.Response;
        let testError: unknown;

        describe('test with correct details', () => {
            beforeAll((done) => {
                supertest(app)
                    .post('/v1/posts')
                    .send({ title: 'This is the title', content: 'This is the content' })
                    .then((res) => (response = res))
                    .catch((err) => (testError = err))
                    .finally(done);
            });

            test('should not throw error', () => {
                expect(testError).toBeUndefined();
            });

            test('should return a Created response', () => {
                expect(response.status).toBe(201);
            });

            test('should return with success true in body', () => {
                expect(response.body.success).toBe(true);
            });

            test('should return with postId in body', () => {
                expect(typeof response.body.data.post_id).toBe('string');
            });
        });

        describe('test with incorrect details', () => {
            beforeAll((done) => {
                supertest(app)
                    .post('/v1/posts')
                    .then((res) => (response = res))
                    .catch((err) => (testError = err))
                    .finally(done);
            });

            test('should not throw error', () => {
                expect(testError).toBeUndefined();
            });

            test('should return a BadRequest response', () => {
                expect(response.status).toBe(400);
            });

            test('should return a resposne error message', () => {
                expect(typeof response.body.error).toBe('string');
            });
        });
    });
});
