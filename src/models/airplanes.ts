import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { AirplaneClassesModel } from './airplaneClasses'
import { AirplaneFlightTimesModel } from './airplaneFlightTimes'

export class AirplanesModel extends Model {
    id!: string
    name!: string
    code!: string
    airplane_price!: number
    company_id!: string
    created_date!: Date
    updated_date!: Date
    deleted_date!: Date | null

    static readonly tableName = 'airplanes'

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        airplaneClasses: {
            relation: Model.HasManyRelation,
            modelClass: AirplaneClassesModel,
            join: {
                from: 'airplanes.id',
                to: 'airplane_classes.airplane_id',
            },
        },
        companies: {
            relation: Model.BelongsToOneRelation,
            modelClass: AirplanesModel,
            join: {
                from: 'airplanes.company_id',
                to: 'companies.id',
            },
        },
        AirplaneFlightTimes: {
            relation: Model.HasManyRelation,
            modelClass: AirplaneFlightTimesModel,
            join: {
                from: 'airplanes.id',
                to: 'airplane_flight_times.airplane_id',
            },
        },
    }
}

export type Airplanes = ModelObject<AirplanesModel>