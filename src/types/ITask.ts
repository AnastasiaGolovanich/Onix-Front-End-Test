import { Status } from '@/constants/Status'
export  interface ITask {
  id: number
  name: string
  description: string
  date: string
  delay: string
  status: Status
}
