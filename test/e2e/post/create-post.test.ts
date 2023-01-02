import supertest from 'supertest';
import pfs from 'fs/promises';
import { closeApp, startApp } from '../../../src/application';
import Config from '../../../src/core/config';
import DependencyInjector from '../../../src/lib/dependency-injector';
import RequestHandlerAdapter from '../../../src/request-handler-adapter/request-handler-adapter';

describe('test for Post controllers', () => {
    const DI = new DependencyInjector();

    let requestHandler: RequestHandlerAdapter;
    let config: Config;
    let app: (request: any, response: any) => any;

    beforeAll(async () => {
        requestHandler = await startApp(DI);
        app = requestHandler.getHandler();
        config = DI.getInstance(Config);

        await pfs
            .stat(config.db.skeleton.path)
            .then(() => pfs.unlink(config.db.skeleton.path))
            .catch(() => {});
    });

    afterAll(async () => {
        await closeApp(DI);

        await pfs
            .stat(config.db.skeleton.path)
            .then(() => pfs.unlink(config.db.skeleton.path))
            .catch(() => {});
    });

    describe('test for POST /v1/posts', () => {
        let response: supertest.Response;
        let testError: unknown;

        describe('test with correct details', () => {
            beforeAll((done) => {
                supertest(app)
                    .post('/v1/posts')
                    .send({
                        title: 'This is the title',
                        content: 'This is the content',
                        unique_name: 'table',
                    })
                    .then((res) => (response = res))
                    .catch((err) => (testError = err))
                    .then(() => console.log('RESPONSE', response.body))
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
                expect(typeof response.body.data.post_id).toBe('number');
            });
        });

        describe('test with incorrect details', () => {
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

            test('should return a BadRequest response', () => {
                expect(response.status).toBe(400);
            });

            test('should return correct response error', () => {
                expect(response.body.error).toBe('INVALID_UNIQUE_NAME_DATA_TYPE');
            });
        });
    });
});
