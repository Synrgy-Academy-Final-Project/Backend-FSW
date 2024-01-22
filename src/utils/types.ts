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
