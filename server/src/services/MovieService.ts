import Movie from '../models/Movie'
import { IMovie } from '../db/MovieSchema'
import { MovieModel } from '../db'
import { SearchCondition } from '../models/SearchCondition'
import { ISearchResult } from '../models/CommonTypes'

class MovieService {

  /**
   * 添加一个电影
   * @param movie
   * @return IMovie | string 添加成功返回电影对象，失败返回一个字符串数组，记录着错误信息
   */
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1. 转换类型，转进来的如果是平面对象，需要转为Movie对象
    movie = Movie.transform(movie)
    // 2. 数据验证
    const errors = await movie.validateThis()
    if (errors.length > 0) {
      return errors
    }
    // 3. 添加到数据库
    return await MovieModel.create(movie)
  }


  /**
   * 修改电影信息
   * @param id 要修改的电影的id
   * @param movie 替换的值
   */
  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1. 转换类型，传进来的如果是平面对象，需要转为Movie对象 tempMovie只是起到数据验证的作用
    // 转换类型之前，很多类型都是缺失的。而转换之后，tempMovie将会获得一些额外的类型，其中
    // 如 isHot、isComing等 由于设置了默认值false，因此最终传入数据库修改的信息，绝对不能含这些
    // 默认的值，因此后面修改数据使用的movie对象，就是传进来的对象才不会有bug
    const tempMovie = Movie.transform(movie)
    // 2. 数据验证 并且跳过那些没有填写的属性
    const errors = await tempMovie.validateThis(true)
    if (errors.length > 0) {
      return errors
    }
    // 3. 修改数据库
    await MovieModel.update({ _id: id }, movie)
    return []
  }

  /**
   * 删除一部电影
   * @param id 要删除的电影的id
   */
  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id })
  }


  /**
   * 查找一部电影
   * @param id 电影的id
   */
  public static async findById(id: string): Promise<IMovie | null> {
    return MovieModel.findById(id)
  }

  /**
   * 查询电影
   * @param searchCondition
   */
  public static async find(searchCondition: SearchCondition): Promise<ISearchResult<IMovie>> {
    const tempCondition = SearchCondition.transform(searchCondition)
    const errors = await tempCondition.validateThis(true)
    if (errors.length > 0) {
      return { count: 0, data: [], errors }
    }
    // 查询
    const movies: IMovie[] = await MovieModel.find({
      // 模糊查询
      name: { $regex: new RegExp(tempCondition.key) }
    }).skip((tempCondition.page - 1) * tempCondition.limit).limit(tempCondition.limit) // 跳过前面页码的据取一页数据
    const count: number = await MovieModel.find({
      name: { $regex: new RegExp(tempCondition.key) }
    }).countDocuments()
    return { count, data: movies, errors: [] }
  }
}

export default MovieService
