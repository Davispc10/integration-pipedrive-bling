import mongoose from 'mongoose'

class Database {
  public mongoConnection: mongoose.Connection

  constructor () {
    this.mongo()
  }

  private mongo (): void {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
}

export default new Database()
