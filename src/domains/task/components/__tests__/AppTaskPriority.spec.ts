import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTaskPriority from '@/domains/task/components/AppTaskPriority.vue'
import type { TaskPriority } from '../../store/taskModel'

describe('AppTaskPriority', () => {
  const cases: { priority: TaskPriority; color: string }[] = [
    { priority: 'low', color: '' },
    { priority: 'medium', color: 'yellow' },
    { priority: 'high', color: 'red' },
  ]

  test.each(cases)('$priority', ({ priority, color }) => {
    const wrapper = mount(AppTaskPriority, { props: { priority } })
    expect(wrapper.text()).toEqual(priority)
    expect(wrapper.attributes().color).toBe(color)
  })
})
