import { useEffect, useState } from "react";
import "./styles.css";
import PageLoader from "./PageLoader";
import Todo from "./Todo";

export default function App() {
	const [todos, setTodos] = useState([]);
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getTodos() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
				if (!res.ok) {
					throw new Error(`Error: ${res.status} - ${res.statusText}`);
				}
				const todos = await res.json();
				setTodos(todos);
			} catch (error) {
				console.error("Failed to fetch todos:", error);
			} finally {
				setLoading(false);
			}
		}
		getTodos();
	}, []);

	const createNewTodo = async (e) => {
		e.preventDefault();
		if (content.trim().length > 0) {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
					method: "POST",
					body: JSON.stringify({ todo: content }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!res.ok) {
					throw new Error(`Error: ${res.status} - ${res.statusText}`);
				}

				const newTodo = await res.json();

				setTodos((prevTodos) => [...prevTodos, newTodo]);
				setContent(""); // Reset the input field
			} catch (error) {
				console.error("Failed to create new todo:", error);
			}
		}
	};

	return (
		<div>
			{loading ? (
				<PageLoader loading={loading} />
			) : (
				<main className="container">
					<h1 className="title">Awesome Todos!</h1>
					<form onSubmit={createNewTodo} className="form">
						<input
							type="text"
							className="form_input"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Add a new todo..."
							required
						/>
						<button className="submit_btn" type="submit">
							Create Todo
						</button>
					</form>
					<div className="todos">
						{todos.map((todo) => (
							<Todo key={todo._id} todo={todo} setTodos={setTodos} />
						))}
					</div>
				</main>
			)}
		</div>
	);
}
