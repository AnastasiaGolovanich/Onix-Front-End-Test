import { ApiService } from '@/service/api'
const url = {
  tasks: 'tasks'
}
export const TasksApi = {
  getTasks () {
    return ApiService.get(url.tasks)
  },
  getTaskById (id: number) {
    return ApiService.get(url.tasks + '/' + id)
  },
  createTask (data: any) {
    return ApiService.post(url.tasks, data)
  },
  updateTask (data: any) {
    return ApiService.put(url.tasks, data)
  },
  patchTask (id: number, data:any) {
    return ApiService.patch(url.tasks + '/' + id, data)
  },
  deleteTask (id: number) {
    return ApiService.delete(url.tasks + '/' + id)
  }
}
