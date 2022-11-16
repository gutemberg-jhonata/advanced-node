import { FacebookAccount } from '@/domain/models'

describe('FacebookAccount', () => {
  const fbData = {
    name: 'any_fb_name',
    email: 'any_fb_email',
    facebookId: 'any_fb_facebookId'
  }

  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual(fbData)
  })

  it('should update name if its empty', () => {
    const accountData = { id: 'any_id' }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: accountData.id,
      ...fbData
    })
  })

  it('should not update name if its not empty', () => {
    const accountData = {
      id: 'any_id',
      name: 'any_name'
    }

    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: accountData.id,
      name: accountData.name,
      email: fbData.email,
      facebookId: fbData.facebookId
    })
  })
})
