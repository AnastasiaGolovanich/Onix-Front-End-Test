import { Module } from 'vuex'
import { Status } from '@/constants/Status'
import { ITask } from '@/types/ITask'
import { IChangeStatus } from '@/types/IChangeStatus'
import { TasksApi } from '@/service/tasksApi'

const store: Module<any, any> = {
  namespaced: true,
  state: {
    tasks: [
    ] as ITask[]
  },
  getters: {
    getTasks: (state: any) => {
      return state.tasks
    },
    getTaskById: (state: any) => (id: number) => {
      return state.task
    },
    getLastId (state: any) : number {
      return state.tasks[state.tasks.length - 1].id
    }
  },
  mutations: {
    setTasksToState: (state, tasks) => {
      state.tasks = tasks.tasks
    },
    setTaskById: (state, task) => {
      state.task = task.tasks[0]
    },
    addNewTask (state, newTask: ITask) {
      state.tasks.push({
        id: newTask.id,
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        delay: 'animation-delay:0s',
        status: Status.todo,
        createDate: newTask.createDate
      })
    },
    removeTask (state, id: number) {
      state.tasks = state.tasks.filter((task: ITask) => task.id !== id)
    },
    saveChanges (state, changeTask: ITask) {
      state.tasks.forEach(function (task : ITask) {
        if (task.id === changeTask.id) {
          task.name = changeTask.name
          task.description = changeTask.description
          task.date = changeTask.date
          task.status = changeTask.status
          task.delay = changeTask.delay
          task.createDate = changeTask.createDate
        }
      })
    },
    changeStatus (state, status: IChangeStatus) {
      state.tasks.forEach(function (task : ITask) {
        if (task.id === status.taskId) {
          if (task.status !== Status.done) {
            task.status = status.status
          }
        }
      })
    }
  },
  actions: {
    getTaskFromAPI ({ commit }) {
      return TasksApi.getTasks().then((response) => {
        commit('setTasksToState', response)
        return response
      })
    },
    getTaskByIdFromAPI ({ commit }, id) {
      return TasksApi.getTaskById(id).then((response) => {
        commit('setTaskById', response)
      })
    },
    deleteTaskFromAPI ({ commit, dispatch }, id) {
      return TasksApi.deleteTask(id)
        .then(() => {
          commit('removeTask', id)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTaskInAPI ({ commit }, task) {
      return TasksApi.updateTask(task)
        .then(() => {
          commit('saveChanges', task)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addNewTaskToAPI ({ commit }, task) {
      return TasksApi.createTask(task)
        .then(() => {
          commit('addNewTask', task)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeTaskStatusInAPI ({ commit }, changeStatus) {
      return TasksApi.patchTask(changeStatus.taskId, { status: changeStatus.status })
        .then((res) => {
          commit('changeStatus', changeStatus)
          return res
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default store
