import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar todos al iniciar
    fetch('http://localhost:3000/todos')
      .then(response => response.json())
      .then(data => {
        console.log('Datos cargados:', data); // Para ver qué datos llegan
        setTodos(data);
      })
      .catch(error => {
        console.error('Error cargando las tareas:', error);
        setError('No se pudieron cargar las tareas');
      });
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Mostrar error si existe
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <h1>To do list</h1>
      <AddTodoForm onAdd={addTodo} />
      {todos.length === 0 ? (
        <p>Cargando tareas...</p>
      ) : (
        <TodoList 
          todos={todos} 
          onComplete={completeTodo} 
          onDelete={deleteTodo} 
        />
      )}
    </div>
  );
}

export default App;