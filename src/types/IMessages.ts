export interface IMessages {
  type: string
  icon: string
  description: string
  attachments: Array<string>
  comment: string | null
  time: string
}
