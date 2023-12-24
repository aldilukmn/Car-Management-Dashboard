import db from '../../../config/knex'
import type User from '../../models/entity/user'
import UserRepository from '../users'
import * as jestMock from 'jest-mock'
const { mocked } = jestMock
jest.mock('../../../config/knex')

describe('User Repository', () => {
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
  },
  {
    id: 4,
    email: 'user4@example.com',
    username: 'user4',
    password: 'user4password',
    role: 'admin'
  }]

  const createMockQueryBuilder = (mockData: User[]): any => ({
    where: jest.fn().mockImplementation((condition) => {
      if (condition.email) {
        const findUser = mockData.find((user) => user.email === condition.email)
        return { first: jest.fn().mockResolvedValueOnce(findUser) }
      } else if (condition.username) {
        const findUser = mockData.find((user) => user.username === condition.username)
        return { first: jest.fn().mockResolvedValueOnce(findUser) }
      } else if (condition.role) {
        const filteredUser = mockData.filter((user) => user.role === condition.role)
        return { select: jest.fn().mockResolvedValueOnce(filteredUser) }
      }
    })
  })

  it('should return user when getUserByEmail is called with a valid email', async () => {
    const mockQueryBuilder = createMockQueryBuilder(mockUser)
    mocked(db).mockReturnValueOnce(mockQueryBuilder)
    const byEmai: string = 'user3@example.com'

    const result = await UserRepository.getUserByEmail(byEmai)

    expect(result).toBeInstanceOf(Object)
    expect(result.email).toEqual('user3@example.com')
  })

  it('should return user when getUserByUsername is called with a valid username', async () => {
    const mockQueryBuilder = createMockQueryBuilder(mockUser)
    mocked(db).mockReturnValueOnce(mockQueryBuilder)
    const byUsername: string = 'user2'

    const result = await UserRepository.getUserByUsername(byUsername)

    expect(result).toBeInstanceOf(Object)
    expect(result.username).toEqual('user2')
  })

  it('should return users when getUserByRole is called with a valid email', async () => {
    const mockQueryBuilder = createMockQueryBuilder(mockUser)
    mocked(db).mockReturnValueOnce(mockQueryBuilder)
    const byRole: string = 'admin'

    const result = await UserRepository.getUsersByRole(byRole)

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toEqual(2)
  })

  it('should create a new user when createUser is called with valid data', async () => {
    const newUser: User = {
      id: 5,
      email: 'newuser@example.com',
      username: 'newuser',
      password: 'newuserpassword',
      role: 'member'
    }

    const mockQueryBuilder = {
      insert: jest.fn().mockImplementation(() => true)
    }

    mocked(db).mockReturnValueOnce(mockQueryBuilder)

    const result = await UserRepository.createUser(newUser)
    mockUser.push(result)

    expect(mockQueryBuilder.insert).toHaveBeenCalledWith(newUser)
    expect(result).toEqual(true)
    expect(mockUser.length).toEqual(5)
  })

  it('should return users', async () => {
    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValueOnce(mockUser)
    }

    // Mocking db.select
    mocked(db).select.mockReturnValueOnce(mockQueryBuilder)

    await UserRepository.getUsers()

    // Verifikasi panggilan fungsi db.select
    expect(mocked(db).select).toHaveBeenCalledWith('email', 'username', 'role')

    // Verifikasi panggilan fungsi db.from dengan parameter yang benar
    expect(mockQueryBuilder.from).toHaveBeenCalledWith(process.env.USERS_TABLE)
  })
})
