import { render, screen } from '@testing-library/react'
import Todo from './Todo'

describe('todo', () => {
  test('renders content', () => {
    const todo = {
      text: 'This is a test todo item',
      done: false,
    }

    const mockCompleteHandler = vi.fn()
    const mockDeleteHandler = vi.fn()

    render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteHandler}
        completeTodo={mockCompleteHandler}
      />
    )

    screen.getByText('This is a test todo item')
  })
})
