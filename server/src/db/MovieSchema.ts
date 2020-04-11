// 这个库是纯js写的，故为了类型检查，可以手动安装声明文件 yarn add -D @types/mongoose
import Mongoose from 'mongoose'
import Movie from '../models/Movie'

// Movie里有我们自己定义的类型，Document理由数据的一些变量类型，如id等
export interface IMovie extends Movie, Mongoose.Document {}

// IMovie接口是类型检查期间即编译时检查的类型
const movieSchema = new Mongoose.Schema<IMovie>({
  // 以下的类型是运行时的类型
  name: String,
  types: [String],
  areas: [String],
  timeLong: Number,
  isHot: Boolean,
  isComing: Boolean,
  isClassic: Boolean,
  description: String,
  poster: String
}, {versionKey: false})

export default Mongoose.model<IMovie>("Movie", movieSchema)

