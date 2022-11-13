import { LoadFacebookUserApi } from '@/data/contracts/api'
import { FacebookAuthenticationUseCase } from '@/data/use-cases'
import { AuthenticationError } from '@/domain/errors'

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const useCase = new FacebookAuthenticationUseCase(loadFacebookUserApi)
    await useCase.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })

  it('should return AuthentucationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const useCase = new FacebookAuthenticationUseCase(loadFacebookUserApi)
    const authResult = await useCase.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
