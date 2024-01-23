export interface BasePriceAirportsType {
    id: string
    fromCity: string
    fromCode: string
    toCity: string
    toCode: string
    duration: number
    price: number
    fromAirportId: string
    toAirportId: string
    createdDate: Date
    updatedDate: Date
}

export interface IReqParams {
    id: string
}

export interface IReqBody {
    dateOfDeparture: Date | string
    dayCategory: string
    price: number
}
