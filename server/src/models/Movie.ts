import { ArrayMinSize, IsNotEmpty, IsInt, Min, Max, IsArray, validate } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'
import { BaseEntity } from './BaseEntity'
import { ClassType } from 'class-transformer/ClassTransformer'

class Movie extends BaseEntity {

  // 电影名称 只在编译时有效
  @IsNotEmpty({ message: '电影名称不可以为空' })
  // 运行时有效 检查类型是否符合要求 函数返回值即为要验证的类型
  @Type(() => String)
  public name: string

  // 电影类型
  @IsNotEmpty({ message: '电影类型不能为空' })
  @ArrayMinSize(1, { message: '电影类型至少得有一个' })
  @IsArray({ message: '电影类型必须是数组' })
  // 限制数组类型时 由于js的数组是没有类型的 所以这里限定类型不必要写Array 是字符串数组则写String即可
  @Type(() => String)
  public types: string[]

  // 上映地区
  @IsNotEmpty({ message: '上映地区不能为空' })
  @ArrayMinSize(1, { message: '上映地区至少得有一个' })
  @IsArray({ message: '上映地区必须是数组' })
  // 限制数组类型时 由于js的数组是没有类型的 所以这里限定类型不必要写Array 是字符串数组则写String即可
  @Type(() => String)
  public areas: string[]

  // 时长
  @IsNotEmpty({ message: '时长不能为空' })
  @IsInt({ message: '时长必须为整数' })
  @Min(1, { message: '时长不能少于1分钟' })
  @Max(999999, { message: '时长过长' })
  @Type(() => Number)
  public timeLong: number

  // 是否热映
  @IsNotEmpty({ message: '是否热映不能为空' })
  @Type(() => Boolean)
  public isHot: boolean = false

  // 是否即将上映
  @IsNotEmpty({ message: '是否即将上映不能为空' })
  @Type(() => Boolean)
  public isComing: boolean = false

  // 是否经典影片
  @IsNotEmpty({ message: '是否是经典影片不能为空' })
  @Type(() => Boolean)
  public isClassic: boolean = false

  // 简介
  @Type(() => String)
  public description?: string

  // 海报图
  @Type(() => String)
  public poster?: string

  public static transform(plainObject: object): Movie {
    return super.baseTransform(Movie, plainObject)
  }

}

export default Movie
