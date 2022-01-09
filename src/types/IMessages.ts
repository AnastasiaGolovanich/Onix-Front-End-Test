export interface Messages {
  type: string
  icon: string
  description: string
  attachments: Array<string>
  comment: string | null
  time: string
}
