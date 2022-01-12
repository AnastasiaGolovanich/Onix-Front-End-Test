import { IMessages } from '@/types/IMessages'
import { defineComponent } from 'vue'

export const state = {
  notification: 3,
  messages: [
    {
      type: 'mark',
      icon: 'check',
      description: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
      attachments: [],
      comment: null,
      time: '8:40 PM'
    },
    {
      type: 'comment',
      icon: 'comment-alt',
      description: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
      attachments: [],
      comment: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
      time: '7:32 PM'
    },
    {
      type: 'upload',
      icon: 'download',
      description: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
      attachments: [require('@/assets/comment-1.jpg'), require('@/assets/comment-2.jpg'), require('@/assets/comment-3.jpg'), require('@/assets/comment-4.jpg')],
      comment: null,
      time: '6:02 PM'
    }
  ] as IMessages[]
}
