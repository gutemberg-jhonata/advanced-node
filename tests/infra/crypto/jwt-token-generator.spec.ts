import { TokenGenerator } from '@/data/contracts/crypto'
import jwt, { sign } from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JwtTokenGenerator {
  constructor (private readonly secret: string) {}

  generateToken (params: TokenGenerator.Params): void {
    const expirationInSeconds = params.expirationInMs / 1000
    sign(
      { key: params.key },
      this.secret,
      { expiresIn: expirationInSeconds }
    )
  }
}

describe('JwtTokenGenerator', () => {
  it('should call sign with correct params', () => {
    const fakeJwt = jwt as jest.Mocked<typeof jwt>
    const sut = new JwtTokenGenerator('any_secret')

    sut.generateToken({
      key: 'any_key',
      expirationInMs: 1000
    })

    expect(fakeJwt.sign).toHaveBeenCalledWith(
      { key: 'any_key' },
      'any_secret',
      { expiresIn: 1 }
    )
  })
})
