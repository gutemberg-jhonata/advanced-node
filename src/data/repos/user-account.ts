export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => LoadUserAccountRepository.Result
}

namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = Promise<void>
}