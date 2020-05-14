export interface IResponseError {
  error: string
  data: null
}

export interface IResponseData<T> {
  error: ''
  data: T
}

export interface IResponsePageData<T> {
  error: ''
  total: number
  data: T[]
}

export interface ISearchCondition {
  page?: number
  limit?: number
  key?: string
}

export enum SwitchType {
  isHot = 'isHot',
  isComing = 'isComing',
  isClassic = 'isClassic'
}
