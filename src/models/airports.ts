import type { UUID } from 'crypto'
import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { BasePriceAirportsModel } from './basePriceAirports'

export class AirportsModel extends Model {
    id!: UUID
    name!: string
    code!: string
    city!: string
    country!: string
    created_date!: Date
    updated_date!: Date
    deleted_date!: Date

    static readonly tableName = 'airports'

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        fromAirport: {
            relation: Model.HasOneRelation,
            modelClass: BasePriceAirportsModel,
            join: {
                from: 'airports.id',
                to: 'baseprice_airports.from_airport',
            },
        },
        toAirport: {
            relation: Model.HasOneRelation,
            modelClass: BasePriceAirportsModel,
            join: {
                from: 'airports.id',
                to: 'baseprice_airports.to_airport',
            },
        },
    }
}

export type Airports = ModelObject<AirportsModel>
