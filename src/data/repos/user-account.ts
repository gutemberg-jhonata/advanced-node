export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => LoadUserAccountRepository.Result
}

namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = Promise<undefined>
}

export interface CreateFacebookAccountRepository {
  createFromFacebook: (params: CreateFacebookAccountRepository.Params) => CreateFacebookAccountRepository.Result
}

namespace CreateFacebookAccountRepository {
  export type Params = {
    name: string
    email: string
    facebookId: string
  }

  export type Result = Promise<void>
}
