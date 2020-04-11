import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'

export abstract class BaseEntity {
  /**
   * 验证当前电影对象(this)，Promise中的泛型是Promise得到的数据类型，string数组为0表示验证通过
   * @param skipMissing 是否跳过那些没有填写的属性
   */
  public async validateThis(skipMissing = false): Promise<string[]> {
    /**
     * errors的结构
     * errors: [
     *  {
     *    constraints: {
     *      IsNotEmpty: '电影名称不能为空',
     *    }
     *  },
     *  {
     *    constraints: {
     *      IsNotEmpty: '时长不可以为空',
     *      IsInt: '时长必须是整数'
     *    }
     *  }
     * ]
     * map => [['电影名称不能为空'], ['时长不可以为空', '时长必须是整数']]
     *  => ['电影名称不能为空', '时长不可以为空', '时长必须是整数']
     */
    const errors = await validate(this, { skipMissingProperties: skipMissing })
    const temp = errors.map(item => Object.values(item.constraints))
    const result: string[] = []
    temp.forEach(errorInfo => {
      result.push(...errorInfo)
    })
    return result
  }

  /**
   * 静态方法，将一个平面对象转为一个Movie对象
   * @param cls 要转为的对象的类名
   * @param plainObject 平面对象
   * @return movie 电影对象
   */
  protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
    if (plainObject instanceof cls) {
      return plainObject
    }
    return plainToClass(cls, plainObject)
  }
}