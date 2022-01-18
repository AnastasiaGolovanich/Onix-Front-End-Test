export default function useNavigationLinks () {
  const links = [
    {
      navName: 'Tasks',
      navLink: '/tasks'
    },
    {
      navName: 'Kanban',
      navLink: '/kanban'
    },
    {
      navName: 'Activity',
      navLink: '/activity'
    },
    {
      navName: 'Calendar',
      navLink: '/calendar'
    },
    {
      navName: 'Files',
      navLink: '/files'
    }
  ]
  return {
    links
  }
}
