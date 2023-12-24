import request from 'supertest'
import app from '../app'
import dotenv from 'dotenv'
dotenv.config()

interface User {
  email: string
  username: string
  password: string
}

describe('Integration Test for Endpoint Register', () => {
  let validUser: User
  process.env.NODE_ENV = 'test' // test or dev
  validUser = {
    email: 'email_valid@mail.com',
    username: 'user_valid',
    password: 'pass_valid'
  }
  it('should return success response on valid register', async () => {
    const validResponse = await request(app)
      .post('/api/v1/user/register')
      .send(validUser)

    expect(validResponse.status).toBe(201)
    expect(validResponse.body.status.response).toBe('success')
    expect(validResponse.body.status.code).toBe(201)
    expect(validResponse.body.status.message).toBe('User successfully created')
  })

  it('should return fail response on register with email already exist!', async () => {
    const validResponse = await request(app)
      .post('/api/v1/user/register')
      .send(validUser)

    expect(validResponse.status).toBe(400)
    expect(validResponse.body.status.response).toBe('fail')
    expect(validResponse.body.status.code).toBe(400)
    expect(validResponse.body.status.message).toBe('Email already exist!')
  })

  it('should return fail response on register with username already exist!', async () => {
    validUser = {
      email: 'email_invalid@mail.com',
      username: 'user_valid',
      password: 'pass_valid'
    }
    const validResponse = await request(app)
      .post('/api/v1/user/register')
      .send(validUser)

    expect(validResponse.status).toBe(400)
    expect(validResponse.body.status.response).toBe('fail')
    expect(validResponse.body.status.code).toBe(400)
    expect(validResponse.body.status.message).toBe('Username already exist!')
  })
})
