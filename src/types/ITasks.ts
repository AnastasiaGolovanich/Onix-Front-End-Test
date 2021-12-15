import { Status } from '@/constants/Status'
export  interface ITasks {
  id: number
  name: string
  description: string
  date: string
  delay: string
  status: Status
}
