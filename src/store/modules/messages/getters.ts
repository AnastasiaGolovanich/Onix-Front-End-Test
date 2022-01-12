import { IMessages } from '@/types/IMessages'

export function getAttachments (state : any) {
  const attachments = [] as Array<string>
  state.messages.forEach((message : IMessages) => {
    if (message.attachments) {
      message.attachments.forEach((file: string) => {
        attachments.push(file)
      })
    }
  })
  return attachments
}
