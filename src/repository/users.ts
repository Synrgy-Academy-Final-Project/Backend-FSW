import { UsersModel } from '../models/users'

export class UserRepository {
    public findUserByEmail = async (email: string): Promise<UsersModel[]> => {
        return await UsersModel.query()
            .where('email', email)
            .throwIfNotFound()
            .select('users.*', 'roles.name as role_name')
            .innerJoin('roles', 'roles.id', 'users.role_id')
    }
}
