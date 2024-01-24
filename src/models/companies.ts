import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { AirplanesModel } from './airplanes'

export class CompaniesModel extends Model {
    id!: string
    name!: string
    url!: string
    created_date!: Date
    updated_date!: Date
    deleted_date!: Date

    static readonly tableName = 'companies'

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        airplaneClasses: {
            relation: Model.HasManyRelation,
            modelClass: AirplanesModel,
            join: {
                from: 'companies.id',
                to: 'airplanes.company_id',
            },
        },
    }
}

export type Companies = ModelObject<CompaniesModel>
