const request = require('supertest')
const app = require('../app')

let directorId

const director = {
  firstName: 'Stanley',
  lastName: 'Kubrick',
  nationality: 'Britain',
  image: 'Stanley.png',
  birthday: '1928-07-26',
}

const BASE_URL = '/api/v1/directors'

test("POST '/directors' should return status code 201 and res.body.firstName === director.firstName", async () => {
  const res = await request(app).post(BASE_URL).send(director)

  directorId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
})

test('GET -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName === director.firstName', async () => {
  const res = await request(app).get(`${BASE_URL}/${directorId}`)
  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
  expect(res.body.lastName).toBe(director.lastName)
})

test('PUT -> BASE_URL/directorId, should return statusCode 200, and res.body.actor === directorUpdate.firstName', async () => {
  const directorUpdate = {
    firstName: 'Robert',
  }

  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(directorUpdate.firstName)
})

test('Delete -> BASE_URL/directorId, should return statusCode 204', async () => {
  const res = await request(app).delete(`${BASE_URL}/${directorId}`)

  expect(res.statusCode).toBe(204)
})
