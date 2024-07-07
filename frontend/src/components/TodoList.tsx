import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries';
import { UPDATE_TODO, DELETE_TODO } from '../graphql/mutations';

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {data.todos.map((todo: any) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => updateTodo({ variables: { id: todo.id, completed: !todo.completed } })}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo({ variables: { id: todo.id } })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
