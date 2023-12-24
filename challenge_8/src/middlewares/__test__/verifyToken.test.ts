import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import UserMiddleware from '../user'
import type DefaultResponse from '../../models/dto/response'

const createResError = (error: string): DefaultResponse => {
  return {
    status: {
      code: 401,
      response: 'fail',
      message: error
    }
  }
}

describe('JWT Verification', () => {
  it('should verify valid token', async () => {
    const payload = { user: 'member', role: 'member' }
    const secretKey = process.env.SECRET_KEY ?? 'rahasia'
    const token = jwt.sign(payload, secretKey)
    const decoded = jwt.verify(token, secretKey) as { user: string }

    const req: Partial<Request> = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const next: NextFunction = jest.fn()

    await UserMiddleware.verifyToken(req, res as Response, next)

    expect(next).toHaveBeenCalled()
    expect(decoded.user).toEqual('member')
    expect(res.status).not.toHaveBeenCalled()
  })

  it('should verify invalid decoded token', async () => {
    const payload = { user: 'member', role: 'member' }
    const secretKey = process.env.SECRET_KEY ?? 'rahasia'
    const token = jwt.sign(payload, secretKey)
    const decoded = jwt.verify(token, secretKey) as { user: string }

    const req: Partial<Request> = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const next: NextFunction = jest.fn()

    await UserMiddleware.verifyToken(req, res as Response, next)

    expect(next).toHaveBeenCalled()
    expect(decoded.user).not.toEqual('user')
    expect(res.status).not.toHaveBeenCalled()
  })

  it('should handle missing token', async () => {
    const req: Partial<Request> = {
      headers: {}
    }

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const next: NextFunction = jest.fn()

    await UserMiddleware.verifyToken(req, res as Response, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(createResError('Please login first!'))
  })

  it('should handle wrong token format', async () => {
    const payload = { user: 'member', role: 'member' }
    const secretKey = process.env.SECRET_KEY ?? 'rahasia'
    const token = jwt.sign(payload, secretKey)

    const req: Partial<Request> = {
      headers: {
        authorization: token
      }
    }

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const next: NextFunction = jest.fn()

    await UserMiddleware.verifyToken(req, res as Response, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith(createResError('Wrong format token!'))
  })

  it('should verify invalid token', async () => {
    const payload = { user: 'member', role: 'member' }
    const secretKey = 'difference-token'
    const token = jwt.sign(payload, secretKey)

    const req: Partial<Request> = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const next: NextFunction = jest.fn()

    await UserMiddleware.verifyToken(req, res as Response, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith(createResError('Invalid token!'))
  })
})
