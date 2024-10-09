export interface Restaurant {
  id: number
  name: string
  location: string
  phone: string | null
  reviews: Review[]
  averageRating: number
  image: string
  logo: string | null
}

export interface Review {
  id: number
  review: string
}