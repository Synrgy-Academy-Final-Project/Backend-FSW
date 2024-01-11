import type { Users } from '../models/users'
import { UserRepository } from '../repository/users'

export class UserService {
    public userRepository: UserRepository

    public constructor() {
        this.userRepository = new UserRepository()
    }

    public getUserByEmail = async (email: string): Promise<Users[]> => {
        return await this.userRepository.findUserByEmail(email)
    }
}
