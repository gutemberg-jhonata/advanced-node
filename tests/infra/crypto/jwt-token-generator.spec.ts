import { JwtTokenGenerator } from '@/infra/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenGenerator', () => {
  let fakeJwt: jest.Mocked<typeof jwt>
  let sut: JwtTokenGenerator
  let token: string
  let secret: string
  let key: string
  let expirationInMs = 1000

  beforeAll(() => {
    token = 'any_token'
    secret = 'any_secret'
    key = 'any_key'
    expirationInMs = 1000
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => token)
  })

  beforeEach(() => {
    sut = new JwtTokenGenerator('any_secret')
  })

  it('should call sign with correct params', async () => {
    await sut.generateToken({ key, expirationInMs })

    expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
  })

  it('should return a token', async () => {
    const token = await sut.generateToken({ key, expirationInMs })

    expect(token).toBe('any_token')
  })

  it('should rethrow if sign throws', async () => {
    fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })

    const promise = sut.generateToken({ key, expirationInMs })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
