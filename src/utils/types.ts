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
  email: string
  password: string
  fromAirportId: string
  toAirportId: string
  duration: number
  dateOfDeparture: Date | string
  dayCategory: string
  price: number
  url: string
  airplaneName: string
  airplaneCode: string
  airplanePrice: number
  companyId: string
  airplaneClassName: string
  airplaneClassPrice: number
  capacity: number
  airplaneId: string
  flightTime: Date
  airplaneFlightTimePrice: number
}
