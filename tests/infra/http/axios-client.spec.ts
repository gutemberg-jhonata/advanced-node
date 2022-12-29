import { HttpGetClient } from '@/infra/http'
import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient {
  async get ({ url, params }: HttpGetClient.Params): Promise<void> {
    return await axios.get(url, { params })
  }
}

describe('AxiosHttpClient', () => {
  describe('get', () => {
    let sut: AxiosHttpClient

    beforeEach(() => {
      sut = new AxiosHttpClient()
    })

    it('should call get with correct params', async () => {
      const fakeAxios = axios as jest.Mocked<typeof axios>

      await sut.get({
        url: 'any_url',
        params: {
          any: 'any'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledWith('any_url', {
        params: {
          any: 'any'
        }
      })
      expect(fakeAxios.get).toBeCalledTimes(1)
    })
  })
})
