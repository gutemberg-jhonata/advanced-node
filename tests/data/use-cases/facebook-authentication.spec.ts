import { LoadFacebookUserApi } from '@/data/contracts/api'
import { FacebookAuthenticationUseCase } from '@/data/use-cases'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: FacebookAuthenticationUseCase
  loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
}

const makeSut = (): SutTypes => {
  const loadFacebookUserApi = mock<LoadFacebookUserApi>()
  const sut = new FacebookAuthenticationUseCase(loadFacebookUserApi)
  return {
    sut,
    loadFacebookUserApi
  }
}

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const { sut, loadFacebookUserApi } = makeSut()
    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toBeCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const { sut } = makeSut()
    // loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
