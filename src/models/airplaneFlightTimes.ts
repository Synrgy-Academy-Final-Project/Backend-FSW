import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { AirplanesModel } from './airplanes'

export class AirplaneFlightTimesModel extends Model {
    id!: string
    airplane_id!: string
    flight_time!: Date
    airplane_flight_time_price!: number
    created_date!: Date
    updated_date!: Date
    deleted_date?: Date

    // alias
    airplaneId?: string
    flightTime?: Date

    static readonly tableName = 'airplane_flight_times'

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        airplanes: {
            relation: Model.BelongsToOneRelation,
            modelClass: AirplanesModel,
            join: {
                from: 'airplane_flight_times.airplane_id',
                to: 'airplanes.id',
            },
        },
    }
}

export type AirplaneFlightTimes = ModelObject<AirplaneFlightTimesModel>
