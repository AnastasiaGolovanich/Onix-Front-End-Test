import axios from 'axios'

// export const tasks = axios.get('https://bubenchik.getsandbox.com:443/tasks')
//   .then((tasks) => {
//     console.log('in useTasks')
//     return tasks.data.tasks
//   }).catch((error) => {
//     console.log(error)
//     return error
//   })
export default async function tasks () {
  try {
    const response = await axios.get('https://bubenchik.getsandbox.com:443/tasks')
    return response.data
  } catch (error) {
    console.error(error)
  }
}
