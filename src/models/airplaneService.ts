import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { AirplanesModel } from './airplanes'

export class AirplaneServiceModel extends Model {
    id!: string
    baggage!: number
    cabin_baggage!: number
    electric_socket!: boolean
    inflight_entertainment!: boolean
    meals!: boolean
    refund!: number
    reschedule!: boolean
    travel_insurance!: boolean
    wifi!: boolean
    airplane_class_id!: string
    created_date!: Date
    updated_date!: Date
    deleted_date?: Date

    static readonly tableName = 'airplane_service'

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        airplanes: {
            relation: Model.BelongsToOneRelation,
            modelClass: AirplanesModel,
            join: {
                from: 'airplane_service.airplane_class_id',
                to: 'airplane_classes.id',
            },
        },
    }
}

export type AirplaneService = ModelObject<AirplaneServiceModel>
