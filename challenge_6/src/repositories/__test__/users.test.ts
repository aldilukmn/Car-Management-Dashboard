import db from '../../../config/knex'
import type User from '../../models/entity/user'
import UserRepository from '../users'
import * as jestMock from 'jest-mock'
const { mocked } = jestMock
jest.mock('../../../config/knex')

describe('UserRepository', () => {
  const mockUser: User[] = [{
    id: 1,
    email: 'user@example.com',
    username: 'user',
    password: 'userpassword',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user2@example.com',
    username: 'user2',
    password: 'user2password',
    role: 'superadmin'
  },
  {
    id: 3,
    email: 'user3@example.com',
    username: 'user3',
    password: 'user3password',
    role: 'member'
  }]

  const createMockQueryBuilder = (mockData: User): any => ({
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValueOnce(mockData)
  })

  it('should return user when getUserByEmail is called with a valid email', async () => {
    const mockQueryBuilder = createMockQueryBuilder(mockUser[0])
    mocked(db).mockReturnValueOnce(mockQueryBuilder)

    const result = await UserRepository.getUserByEmail(mockUser[0].email)

    expect(result).toHaveProperty('email', 'user@example.com')
  })

  it('should return user when getUserByUsername is called with a valid username', async () => {
    const mockQueryBuilder = createMockQueryBuilder(mockUser[1])
    mocked(db).mockReturnValueOnce(mockQueryBuilder)

    const result = await UserRepository.getUserByUsername(mockUser[1].username)

    expect(result).toHaveProperty('username', 'user2')
  })

  it('should return user when getUserByRole is called with a valid email', async () => {
    const mockockQueryBuilder: any = {
      whereNot: jest.fn().mockReturnThis(),
      from: jest.fn().mockResolvedValueOnce(mockUser)
    }

    mocked(db).mockReturnValueOnce(mockockQueryBuilder)

    const result = await UserRepository.getUsersByRole('admin')

    expect(result).toHaveProperty('role', 'admin')
  })
})
