import type { UUID } from 'crypto'
import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { AirportsModel } from './airports'

export class BasePriceAirportsModel extends Model {
    id!: string
    from_airport_id!: UUID
    to_airport_id!: UUID
    departure_code!: string
    arrival_code!: string
    duration!: number
    airport_price!: number
    created_date!: Date
    updated_date!: Date
    deleted_date!: Date

    // types for alias
    fromCity!: string
    fromCode!: string
    toCity!: string
    toCode!: string
    price!: number
    createdDate!: Date
    updatedDate!: Date

    static readonly tableName = 'baseprice_airports'

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        fromAirport: {
            relation: Model.BelongsToOneRelation,
            modelClass: AirportsModel,
            join: {
                from: 'baseprice_airports.from_airport',
                to: 'airports.id',
            },
        },
        toAirport: {
            relation: Model.BelongsToOneRelation,
            modelClass: AirportsModel,
            join: {
                from: 'baseprice_airports.to_airport',
                to: 'airports.id',
            },
        },
    }
}

export type BasePriceAirports = ModelObject<BasePriceAirportsModel>
