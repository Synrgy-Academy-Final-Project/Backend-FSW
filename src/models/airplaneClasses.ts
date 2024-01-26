import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { AirplanesModel } from './airplanes'
import { AirplaneServiceModel } from './airplaneService'

export class AirplaneClassesModel extends Model {
    id!: string
    airplane_id!: string
    airplane_class!: string
    capacity!: number
    airplane_class_price!: number
    created_date!: Date
    updated_date!: Date
    deleted_date?: Date

    // alias
    airplaneId?: string
    airplaneClassName?: string

    static readonly tableName = 'airplane_classes'

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        airplanes: {
            relation: Model.BelongsToOneRelation,
            modelClass: AirplanesModel,
            join: {
                from: 'airplane_classes.airplane_id',
                to: 'airplanes.id',
            },
        },
        airplaneService: {
            relation: Model.HasOneRelation,
            modelClass: AirplaneServiceModel,
            join: {
                from: 'airplane_classes.id',
                to: 'airplane_service.airplane_class_id',
            },
        },
    }
}

export type AirplaneClasses = ModelObject<AirplaneClassesModel>
