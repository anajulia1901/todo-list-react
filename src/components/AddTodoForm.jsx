import { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creator, setCreator] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name) {
      alert('Por favor escribe un nombre para la tarea');
      return;
    }

    const newTodo = {
      id: Date.now(),
      name,
      description,
      creator,
      isCompleted: false
    };

    onAdd(newTodo);
    setName('');
    setDescription('');
    setCreator('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        placeholder="Nombre de la tarea"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Creador"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
}

export default AddTodoForm;