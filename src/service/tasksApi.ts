import { ApiService } from '@/service/api'

export const TasksApi = {
  getTasks () {
    return ApiService.get('tasks')
  },
  getTaskById (id: number) {
    return ApiService.get('tasks/' + id)
  },
  createTask (data: any) {
    return ApiService.post('tasks', data)
  },
  updateTask (data: any) {
    return ApiService.put('tasks', data)
  },
  patchTask (id: number, data:any) {
    return ApiService.patch('tasks/' + id, data)
  },
  deleteTask (id: number) {
    return ApiService.delete('tasks/' + id)
  }
}
