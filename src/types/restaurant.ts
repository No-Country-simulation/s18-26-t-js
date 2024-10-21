export interface Review {
  id:number     
  comment?:string
  rating:1|2|3|4|5
  restaurantId:number 
  userId:number 
  images?:string[] 
  createdAt:string 
}


export interface Restaurant {
  id: number
  name: string
  city: string
  location: string
  phone: string
  averageRating: number
  imageUrl: string
  logoUrl: string
  description: string
  createdAt: string
  updatedAt: string
  reviews: Review[]
}