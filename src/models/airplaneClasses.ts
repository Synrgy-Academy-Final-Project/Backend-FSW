import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { AirplanesModel } from './airplanes'

export class AirplaneClassesModel extends Model {
    id!: string
    airplane_id!: string
    airplane_class!: string
    capacity!: number
    airplane_class_price!: number
    created_date!: Date
    updated_date!: Date
    deleted_date!: Date

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
    }
}

export type AirplaneClasses = ModelObject<AirplaneClassesModel>
