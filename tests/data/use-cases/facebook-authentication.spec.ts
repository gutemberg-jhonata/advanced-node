import { FacebookAuthenticationUseCase } from '@/data/use-cases'
import { AuthenticationError } from '@/domain/errors'

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = {
      loadUser: jest.fn()
    }
    const useCase = new FacebookAuthenticationUseCase(loadFacebookUserApi)
    await useCase.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toBeCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = {
      loadUser: jest.fn()
    }
    // loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const useCase = new FacebookAuthenticationUseCase(loadFacebookUserApi)
    const authResult = await useCase.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
