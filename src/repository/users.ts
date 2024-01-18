import { UsersModel } from '../models/users'

export class UserRepository {
    public findUserByEmail = async (email: string): Promise<UsersModel[]> => {
        return await UsersModel.query()
            .select(
                'users.id',
                'users.email',
                'users.password',
                'users.user_active',
                'roles.name as role_name',
                'users_details.first_name',
                'users_details.last_name'
            )
            .where('email', email)
            .join('roles', 'roles.id', 'users.role_id')
            .join('users_details', 'users_details.id', 'users.user_detail_id')
            .throwIfNotFound()
    }
}
