const supertest = require('supertest');

const db = require('../database/dbConfig');
const server = require('./server.js');

it('should use the test environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('server', () => {
    beforeAll(async () => {
        await db('users').truncate();
    });
    beforeAll(async () => {
        await db('howtos').truncate();
    });
    let token;
    let userToken;
    const user = {
        username: 'zavala',
        password: 'password',
        email: 'zavala@email.com',
        role: 'creator'
    }    
    const user2 = {
        username: 'shaxx',
        password: 'password',
        email: 'shaxx@email.com',
        role: 'user'
    }
    const user3 = {
        username: 'eris',
        password: 'password',
        email: 'eris@email.com',
        role: 'creator'
    }
    const nonUser = {
        username: 'noreg',
        password: 'password'
    }
    const howto = {
        name: 'how to make a database',
        body: 'make an index.js file, make profit'
    }


    describe('/api/register', () => {
        it('should return 400 if no data is sent', () => {
            return supertest(server).post('/api/register')
            .send({})
            .then(res => {
                expect(res.status).toBe(400);
            });
        });

        it('should return 201 OK', () => {
            return supertest(server).post('/api/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201);
            });
        });

        it('should return data', () => {
            return supertest(server).post('/api/register')
            .send(user2)
            .then(res => {
                expect(res.body.data).not.toBeNull()
            });
        });

        it('should not return non hashed password', () => {
            return supertest(server).post('/api/auth/register')
            .send(user3)
            .then(res => {
                expect(res.body.password).not.toBe('password');
            });
        });
    });

    describe('POST /api/login', () => {
        it('should return 400 if sent no data', () => {
            return supertest(server).post('/api/login')
            .send({})
            .then(res => {
                expect(res.status).toBe(400);
            });
        });

        it('should return 401 if user is not registered', () => {
            return supertest(server).post('/api/login')
            .send(nonUser)
            .then(res => {
                expect(res.status).toBe(401);
            });
        })

        it('should return 200 if user is registered with right credentials', () => {
            return supertest(server).post('/api/login')
            .send(user)
            .then(res => {
                token = res.body.token;
                expect(res.status).toBe(200);
            });
        });

        it('should return message: Welcome to our API', () => {
            return supertest(server).post('/api/login')
            .send(user2)
            .then(res => {
                userToken = res.body.token;
                expect(res.body.message).toBe("Welcome to our API");
            });
        });
    });

    describe('GET /api', () => {
        it('should return 200 OK', () => {
            return supertest(server).get('/api')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });

        it('should return some data', () => {
            return supertest(server).get('/api')
            .then(res => {
                expect(res.body).toBeTruthy();
            });
        });
    });

    describe('GET /howtos', () => {
        it('should return 200 OK', () => {
            return supertest(server).get('/howtos')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });

        it('should return some howtos', () => {
            return supertest(server).get('/howtos')
            .then(res => {
                expect(res.body).not.toBeNull();
            });
        });
    });

    describe('POST /howtos', () => {
        it('should return 401 if not logged in', () => {
            return supertest(server).post('/howtos')
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body).toStrictEqual({ message: "please provide credentials to access this resource" })
            });
        });

        it('should return 400 with message if user is not a creator', () => {
            return supertest(server).post('/howtos')
            .set('Authorization', userToken)
            .send(howto)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body).toStrictEqual({ message: "Endpoint only available to creators." })
            });
        });

        it('should return 201 with message if user is a creator', () => {
            return supertest(server).post('/howtos')
            .set('Authorization', token)
            .send(howto)
            .then(res => {
                expect(res.status).toBe(201)
                expect(res.body.message).toBe("Howto posted")
            });
        });
    });

})