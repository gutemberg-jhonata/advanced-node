import { AuthenticationError } from '@/domain/errors'
import { LoadFacebookUserApi } from '@/data/contracts/api'
import { FacebookAuthentication } from '@/domain/features'
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '@/data/repos'
import { FacebookAccount } from '@/domain/models'

export class FacebookAuthenticationUseCase {
  constructor (private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      await this.userAccountRepo.saveWithFacebook(fbAccount)
    }

    return new AuthenticationError()
  }
}
