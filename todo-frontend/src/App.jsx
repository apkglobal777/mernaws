import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const API = "http://localhost:5001";

  useEffect(() => {
    axios.get(`${API}/todos`).then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post(`${API}/todos`, { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
