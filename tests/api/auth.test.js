
const pactum = require('./pactum.setup.js');
const { spec } = require('pactum'); 

describe('Auth API', () => {
// se puede poner await spec() si se declara antes o si no await pactum.spec() como en el siguiente 'it'
  it('login profesor correcto', async () => {
    await spec()
      .post('/login')
      .withJson({
        email: 'professor@test.com',
        password: '1234'
      })
      .expectStatus(200)
    });
 
  it('login alumno correcto', async () => {
    await pactum
      .spec()
      .post('/login')
      .withJson({
        email: 'alumno@test.com',
        password: '1234'
      })
      .expectStatus(200);

  });

  it('login incorrecto devuelve 401', async () => {
    await pactum
      .spec()
      .post('/login')
      .withJson({
        email: 'mal@test.com',
        password: 'wrong'
      })
      .expectStatus(401);
  });

});