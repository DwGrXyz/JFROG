export const taskPriorityVariant = ['low', 'medium', 'high']
export type TaskPriority = 'low' | 'medium' | 'high'

export const taskStatusVariant = ['pending', 'in-progress', 'completed']
export type TaskStatus = 'pending' | 'in-progress' | 'completed'

export type TaskModel = {
  id: string
  projectId: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
}
