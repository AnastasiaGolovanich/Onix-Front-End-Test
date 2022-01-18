import { Status } from '@/constants/Status'
export interface ITask {
  id: number
  name: string
  description: string
  date: string
  createDate: string
  delay: string
  status: Status
}
