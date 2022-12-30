import { AxiosHttpClient } from '@/infra/http'
import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  describe('get', () => {
    let sut: AxiosHttpClient
    let fakeAxios: jest.Mocked<typeof axios>
    let url: string
    let params: object

    beforeAll(() => {
      fakeAxios = axios as jest.Mocked<typeof axios>
      fakeAxios.get.mockResolvedValue({
        status: 200,
        data: 'any_data'
      })
      url = 'any_url'
      params = { any: 'any' }
    })

    beforeEach(() => {
      sut = new AxiosHttpClient()
    })

    it('should call get with correct params', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith('any_url', { params })
      expect(fakeAxios.get).toBeCalledTimes(1)
    })

    it('should return data on success', async () => {
      fakeAxios.get.mockRejectedValueOnce(new Error('http_error'))

      const promise = sut.get({ url, params })

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })

    it('should rethrow when get throws', async () => {
      const result = await sut.get({ url, params })

      expect(result).toEqual('any_data')
    })
  })
})
