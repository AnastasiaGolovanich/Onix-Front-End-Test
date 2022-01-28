import { Module } from 'vuex'
import { Status } from '@/constants/Status'
import { ITask } from '@/types/ITask'
import { IChangeStatus } from '@/types/IChangeStatus'
import axios from 'axios'

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
      axios.get('https://bubenchik.getsandbox.com:443/tasks')
        .then((tasks) => {
          commit('setTasksToState', tasks.data)
        }).catch((error) => {
          console.log(error)
        })
    },
    getTaskByIdFromAPI ({ commit }, id) {
      axios.get<any, any, ITask>('https://bubenchik.getsandbox.com:443/tasks/' + id)
        .then((response) => {
          commit('setTaskById', response.data)
        })
    },
    deleteTaskFromAPI ({ commit }, id) {
      axios.delete('https://bubenchik.getsandbox.com:443/tasks/' + id, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          commit('removeTask', id)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTaskInAPI ({ commit }, task) {
      axios.put('https://bubenchik.getsandbox.com:443/tasks/' + task.id, task)
        .then(() => {
          commit('saveChanges', task)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addNewTaskToAPI ({ commit }, task) {
      axios.post('https://bubenchik.getsandbox.com:443/tasks', task)
        .then(() => {
          commit('addNewTask', task)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeTaskStatusInAPI ({ commit }, changeStatus) {
      axios.patch('https://bubenchik.getsandbox.com:443/tasks/' + changeStatus.taskId, { status: changeStatus.status })
        .then(() => {
          commit('changeStatus', changeStatus)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default store
