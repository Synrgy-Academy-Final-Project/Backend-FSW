import type { Users } from '../models/users'
import { UserRepository } from '../repository/users'

export class UserService {
  // membuat variable readonly dan hanya bisa di instance oleh user repository
  readonly userRepository: UserRepository

  public constructor() {
    this.userRepository = new UserRepository()
  }

  //   method mendapatkan user berdasarkan email

  public getUserByEmail = async (email: string): Promise<Users[]> => {
    return await this.userRepository.findUserByEmail(email)
  }
}
