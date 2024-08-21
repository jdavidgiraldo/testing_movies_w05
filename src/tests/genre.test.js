const request = require('supertest')
const app = require('../app')

let genreId

const genre = {
  name: 'drama',
}

const BASE_URL = '/api/v1/genres'

test("POST '/genres' should return status code 201 and res.body.name === genre.name", async () => {
  const res = await request(app).post(BASE_URL).send(genre)

  genreId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

test('GET -> BASE_URL/genreId, should return statusCode 200, and res.body.name === genre.name', async () => {
  const res = await request(app).get(`${BASE_URL}/${genreId}`)
  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

test('PUT -> BASE_URL/genreId, should return statusCode 200, and res.body.genre === genreUpdate.name', async () => {
  const genreUpdate = {
    name: 'thriller',
  }

  const res = await request(app).put(`${BASE_URL}/${genreId}`).send(genreUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genreUpdate.name)
})

test('Delete -> BASE_URL/genreId, should return statusCode 204', async () => {
  const res = await request(app).delete(`${BASE_URL}/${genreId}`)

  expect(res.statusCode).toBe(204)
})
