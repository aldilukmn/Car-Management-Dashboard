import { describe, expect } from '@jest/globals'
import request from 'supertest'
import app from './app'
import UserRepository from './repositories/users'
import dotenv from 'dotenv'
dotenv.config()

describe('Integration Test for Endpoint Login', () => {
  let validUser: { username: string, password: string }
  beforeAll(async () => {
    process.env.NODE_ENV = 'test' // test or dev
    validUser = {
      username: 'user_valid',
      password: 'pass_valid'
    }
    await UserRepository.addUser(validUser)
  })

  it('should return success response on valid login', async () => {
    const validResponse = await request(app)
      .post('/api/v1/superadmin/login')
      .send(validUser)

    expect(validResponse.status).toBe(200)
    expect(validResponse.body.status.response).toBe('success')
    expect(validResponse.body.status.code).toBe(200)
  })

  it('should return fail response on invalid login', async () => {
    await UserRepository.clearUser(validUser.username)
    const response = await request(app)
      .post('/api/v1/superadmin/login')
      .send({
        username: 'user_invalid',
        password: 'user_invalid'
      })
    expect(response.status).toBe(400)
    expect(response.body.status.response).toBe('fail')
    expect(response.body.status.code).toBe(400)
  })
})
