import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTaskStatus from '@/domains/task/components/AppTaskStatus.vue'
import type { TaskStatus } from '../../store/taskModel'

describe('AppTaskStatus', () => {
  const cases: { status: TaskStatus; color: string }[] = [
    { status: 'pending', color: 'blue' },
    { status: 'in-progress', color: 'blue' },
    { status: 'completed', color: 'green' },
  ]

  test.each(cases)('$priority', ({ status, color }) => {
    const wrapper = mount(AppTaskStatus, { props: { status } })
    expect(wrapper.text()).toEqual(status)
    expect(wrapper.attributes().color).toBe(color)
  })
})
