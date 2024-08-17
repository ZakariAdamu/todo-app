import React, { useCallback } from "react";

const Todo = ({ todo, setTodos }) => {
	const updateTodo = useCallback(
		async (todoId, todoStatus) => {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/todos/${todoId}`,
					{
						method: "PUT",
						body: JSON.stringify({ status: todoStatus }),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (!res.ok) {
					throw new Error(`Error: ${res.status} - ${res.statusText}`);
				}

				const todoForUpdate = await res.json();

				if (todoForUpdate.acknowledged) {
					setTodos((currentTodos) =>
						currentTodos.map((currentTodo) =>
							currentTodo._id === todoId
								? { ...currentTodo, status: !currentTodo.status }
								: currentTodo
						)
					);
				}
			} catch (error) {
				console.error("Failed to update todo:", error);
			}
		},
		[setTodos]
	);

	const deleteTodo = useCallback(
		async (todoId) => {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/todos/${todoId}`,
					{
						method: "DELETE",
					}
				);

				if (!res.ok) {
					throw new Error(`Error: ${res.status} - ${res.statusText}`);
				}

				const todoForDelete = await res.json();

				if (todoForDelete.acknowledged) {
					setTodos((currentTodos) =>
						currentTodos.filter((currentTodo) => currentTodo._id !== todoId)
					);
				}
			} catch (error) {
				console.error("Failed to delete todo:", error);
			}
		},
		[setTodos]
	);

	return (
		<div className="todo">
			<p>{todo.todo}</p>
			<div className="mutation_btn">
				<button
					className="todo_status_btn"
					onClick={() => updateTodo(todo._id, todo.status)}
				>
					{todo.status ? "☑" : "☐"}
				</button>
				<button
					className="todo_delete_btn"
					onClick={() => deleteTodo(todo._id)}
				>
					🗑️
				</button>
			</div>
		</div>
	);
};

export default Todo;
