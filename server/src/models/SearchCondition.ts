import { IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { BaseEntity } from './BaseEntity'

export class SearchCondition extends BaseEntity {
  // 默认为第一页
  @IsInt({ message: '页面必须是整数' })
  @Min(1, { message: '页码最小值为1' })
  @Type(() => Number)
  public page: number = 1

  // 页容量，默认一页显示10条
  @IsInt({ message: '页容量必须是整数' })
  @Min(1, { message: '页容量最小值为1' })
  @Type(() => Number)
  public limit: number = 10

  // 搜索关键字
  @Type(() => String)
  public key: string = ''

  public static transform(plainObject: object): SearchCondition {
    return super.baseTransform(SearchCondition, plainObject)
  }
}