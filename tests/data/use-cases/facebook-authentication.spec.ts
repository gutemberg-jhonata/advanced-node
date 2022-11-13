import { LoadFacebookUserApi } from '@/data/contracts/api'
import { FacebookAuthenticationUseCase } from '@/data/use-cases'
import { AuthenticationError } from '@/domain/errors'
import { mock } from 'jest-mock-extended'

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    const useCase = new FacebookAuthenticationUseCase(loadFacebookUserApi)
    await useCase.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toBeCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    // loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const useCase = new FacebookAuthenticationUseCase(loadFacebookUserApi)
    const authResult = await useCase.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
