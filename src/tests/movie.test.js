require('../models')

const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Genre = require('../models/Genre')
const Director = require('../models/Director')

let movieId

const movie = {
  name: 'A clockwork orange',
  image: 'Aclockworkorange.png',
  synopsis: 'string',
  releaseYear: 1971,
}

const BASE_URL = '/api/v1/movies'

test("POST '/movies' should return status code 201 and res.body.name === movie.name", async () => {
  const res = await request(app).post(BASE_URL).send(movie)

  movieId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test("Get '/movies' should return status code 200 ", async () => {
  const res = await request(app).get(BASE_URL)

  // console.log(res.body)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].actors).toBeDefined()
  expect(res.body[0].actors).toHaveLength(0)

  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)

  expect(res.body[0].directors).toBeDefined()
  expect(res.body[0].directors).toHaveLength(0)
})

test('GET -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movie.name', async () => {
  const res = await request(app).get(`${BASE_URL}/${movieId}`)
  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)

  expect(res.body.actors).toBeDefined()
  expect(res.body.actors).toHaveLength(0)

  expect(res.body.genres).toBeDefined()
  expect(res.body.genres).toHaveLength(0)

  expect(res.body.directors).toBeDefined()
  expect(res.body.directors).toHaveLength(0)
})

test('PUT -> BASE_URL/movieId, should return statusCode 200, and res.body.movie === movieUpdate.name', async () => {
  const movieUpdate = {
    name: 'A beautiful mind',
  }

  const res = await request(app).put(`${BASE_URL}/${movieId}`).send(movieUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
})

test('POST -> BASE_URL/:id/actors, should return statusCode 200, and res.body.length === 1', async () => {
  const actor = {
    firstName: 'Malcom',
    lastName: 'Mcdowell',
    nationality: 'Britain',
    image: 'MalcomMcdowwel.png',
    birthday: '1943-06-13',
  }

  const createActors = await Actor.create(actor)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([createActors.id])

  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  await createActors.destroy()
})

test('POST -> BASE_URL/:id/genres, should return statusCode 200, and res.body.length === 1', async () => {
  const genre = {
    name: 'drama',
  }

  const createGenres = await Genre.create(genre)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([createGenres.id])

  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  await createGenres.destroy()
})

test('POST -> BASE_URL/:id/directors, should return statusCode 200, and res.body.length === 1', async () => {
  const director = {
    firstName: 'Malcom',
    lastName: 'Mcdowell',
    nationality: 'Britain',
    image: 'MalcomMcdowwel.png',
    birthday: '1943-06-13',
  }

  const createDirectors = await Director.create(director)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([createDirectors.id])

  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  await createDirectors.destroy()
})

test('Delete -> BASE_URL/movieId, should return statusCode 204', async () => {
  const res = await request(app).delete(`${BASE_URL}/${movieId}`)

  expect(res.statusCode).toBe(204)
})
