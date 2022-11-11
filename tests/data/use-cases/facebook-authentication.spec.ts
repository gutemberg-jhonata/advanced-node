import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationUseCase {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUserApi) {}

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserApi.loadUser(params)
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => LoadFacebookUserApi.Result
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = Promise<void>
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const useCase = new FacebookAuthenticationUseCase(loadFacebookUserApi)
    await useCase.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })
})
