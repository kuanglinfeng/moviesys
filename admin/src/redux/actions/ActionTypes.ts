/**
 * T 表示 type
 * P 表示 payload
 */
export interface IAction<T extends string, P> {
  type: T
  payload: P
}