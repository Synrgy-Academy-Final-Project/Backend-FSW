import type { UUID } from 'crypto'
import { Model } from 'objection'
import type { ModelObject } from 'objection'
import { UsersModel } from './users'

export class UsersDetailsModel extends Model {
    id!: UUID
    address!: string
    gender!: string
    phone_number!: string
    visa!: string
    passport!: string
    resident_permit!: string
    nik!: string
    created_date!: EpochTimeStamp
    updated_date!: EpochTimeStamp

    static readonly tableName = 'users_details'

    static relationMappings = {
        users: {
            relation: Model.HasOneRelation,
            modelClass: UsersModel,
            join: {
                from: 'users_details.id',
                to: 'users.user_detail_id',
            },
        },
    }
}

export type UsersDetails = ModelObject<UsersDetailsModel>
