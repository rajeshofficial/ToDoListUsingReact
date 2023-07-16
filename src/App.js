import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState(""); // State variable to store the current todo item
  const [todos, setTodos] = useState([]); // State variable to store the list of todos
  const [editId, setEditId] = useState(null); // State variable to store the ID of the todo being edited

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) { // If editId is not null, it means we are editing an existing todo
      const editTodo = todos.find((i) => i.id === editId); // Find the todo to be edited
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id ? { id: t.id, todo } : t // Update the todo with new content
      );
      setTodos(updatedTodos); // Update the todos list with the edited todo
      setEditId(null); // Clear the editId to indicate that we are no longer editing
      setTodo(""); // Clear the todo input field
      return;
    }

    if (todo !== "") { // If the todo is not empty
      setTodos([{ id: `${todo} - ${Date.now()}`, todo }, ...todos]); // Add the new todo to the beginning of the todos list
      setTodo(""); // Clear the todo input field
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id); // Filter out the todo to be deleted
    setTodos(delTodo); // Update the todos list without the deleted todo
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id); // Find the todo to be edited
    setTodo(editTodo.todo); // Set the todo input field with the content of the todo being edited
    setEditId(id); // Set the editId to indicate that we are editing a todo with the specified ID
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To-do List App</h1>
        <form className="todoform" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className='goedt' type="submit">
            {editId ? "Edit" : "Go"}
          </button>
        </form>

        <ul className="alltodos">
          {todos.map((t) => (
            <li className="singletext" key={t.id}>
              <span className="todotext">{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
