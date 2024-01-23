/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'objection'
import type { ModelObject } from 'objection'

export class BasePriceDatesModel extends Model {
    id!: string
    date_from!: Date
    date_price!: number
    type!: string
    created_date!: Date
    updated_date!: Date
    deleted_date!: Date

    // types for alias
    dateOfDeparture!: Date
    dayCategory!: string

    static readonly tableName = 'baseprice_dates'
}

export type BasePriceDates = ModelObject<BasePriceDatesModel>
