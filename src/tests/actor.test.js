const request = require('supertest')
const app = require('../app')

let actorId

const actor = {
  firstName: 'Malcom',
  lastName: 'Mcdowell',
  nationality: 'Britain',
  image: 'MalcomMcdowwel.png',
  birthday: '1943-06-13',
}

const BASE_URL = '/api/v1/actors'

test("POST '/actors' should return status code 201 and res.body.firstName === actor.firstName", async () => {
  const res = await request(app).post(BASE_URL).send(actor)

  actorId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

test('GET -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName === actor.firstName', async () => {
  const res = await request(app).get(`${BASE_URL}/${actorId}`)
  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
  expect(res.body.lastName).toBe(actor.lastName)
})

test('PUT -> BASE_URL/actorId, should return statusCode 200, and res.body.actor === actorUpdate.firstName', async () => {
  const actorUpdate = {
    firstName: 'Maria',
  }

  const res = await request(app).put(`${BASE_URL}/${actorId}`).send(actorUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)
})

test('Delete -> BASE_URL/actorId, should return statusCode 204', async () => {
  const res = await request(app).delete(`${BASE_URL}/${actorId}`)

  expect(res.statusCode).toBe(204)
})
