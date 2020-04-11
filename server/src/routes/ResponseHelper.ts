/**
 * 进行响应：服务器的接口响应格式，往往是一种标准格式
 * 这里我们进行约定：
 * 错误：{error: 'xxx', data: null}
 * 正常：{error: '', data: 数据}
 * 分页：{error: '', data: xxx[], total: xxx}
 */
import { Response } from 'express'
import { ISearchResult } from '../models/CommonTypes'

export class ResponseHelper {

  /**
   * 响应错误
   * @param errors
   * @param response
   */
  public static sendError(errors: string | string[], response: Response) {
    let error: string
    if (Array.isArray(errors)) {
      error = errors.join(';')
    } else {
      error = errors
    }
    response.send({ error, data: null })
  }

  /**
   * 响应普通数据
   * @param data
   * @param response
   */
  public static sendData(data: any, response: Response) {
    response.send({ error: '', data })
  }

  /**
   * 响应分页数据
   * @param result
   * @param response
   */
  public static sendPageData<T>(result: ISearchResult<T>, response: Response) {
    if (result.errors.length > 0) {
      this.sendError(result.errors, response)
    } else {
      response.send({ error: '', data: result.data, total: result.count })
    }
  }
}