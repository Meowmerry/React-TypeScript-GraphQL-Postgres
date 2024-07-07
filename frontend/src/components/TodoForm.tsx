import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../graphql/mutations';
import { GET_TODOS } from '../graphql/queries';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({ variables: { title } });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
