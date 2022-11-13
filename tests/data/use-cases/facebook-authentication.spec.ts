import { LoadFacebookUserApi } from '@/data/contracts/api'
import { LoadUserAccountRepository } from '@/data/repos'
import { FacebookAuthenticationUseCase } from '@/data/use-cases'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationUseCase', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationUseCase
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadFacebookUserApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    loadUserAccountRepo = mock()
    sut = new FacebookAuthenticationUseCase(loadFacebookUserApi, loadUserAccountRepo)
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserApi.loadUser).toBeCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    // loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepository when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1)
  })
})
