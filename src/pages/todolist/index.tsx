import { useEffect, useState } from "react";
import { ToDoDocument, TodoState } from "../../model/Todo";
import { sendData, connect } from "../../services/TodoEditService";
import TodoCard from "./TodoCard";
import { useParams } from "react-router-dom";
import { getTodos } from "../../services/TodoService";

function TodoList() {
    const { id: todolistID } = useParams();
    const [todos, setTodos] = useState<ToDoDocument>(
        new ToDoDocument(todolistID || "", [], [], [])
    );

    const [inputValue, setInputValue] = useState("");

    const mergeIncommingData = (message: any) => {
        console.log("Received message: " + message.body);
        const incomingTodo = JSON.parse(message.body) as ToDoDocument;
        console.log("Incoming todo:", incomingTodo);
        const merged = ToDoDocument.mergeDocuments(todos, incomingTodo);
        console.log("Merged todo:", merged);
        setTodos(merged);
    };

    const deleteTodo = (id: string) => {
        const updatedTodos = { ...todos };
        updatedTodos.removed.push(id);
        setTodos(updatedTodos);
        sendData(updatedTodos);
    };
    const addTodo = () => {
        const updatedTodos = { ...todos };
        // generate random id
        const randomId = Math.random().toString(36).substring(7);
        updatedTodos.items.push({ id: randomId, title: inputValue });
        setTodos(updatedTodos);
        setInputValue("");
        sendData(updatedTodos);
    };

    const completeTodo = (id: string) => {
        const updatedTodos = { ...todos };
        updatedTodos.states.push(new TodoState(id, true, Date.now()));
        setTodos(updatedTodos);
        sendData(updatedTodos);
    };

    const isCompletedOrRemoved = (id: string) =>
        todos.states.find((state) => state.id === id)?.completed ||
        todos.removed.includes(id);

    const setFromServer = () => {
        getTodos(todolistID).then((data) => {
            if (data === null) setTodos(new ToDoDocument("", [], [], []));
            setTodos(data as ToDoDocument);
        });
    };

    useEffect(() => {
        connect(todolistID, mergeIncommingData);
        setFromServer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-[100vh] w-full bg-surface-mixed-2-100 flex items-center justify-center">
            <div className="p-2 h-36 w-[32rem] bg-blue flex-col gap-2 content-center">
                <h1 className="p-2 py-3 text-4xl text-white font-bold">
                    Todolist {todos.id}
                </h1>
                <div className="px-2 mb-2 inline-flex gap-2 items-center justify-center">
                    <input
                        type="text"
                        className="px-3 p-2 h-10 w-96 rounded-lg bg-transparent border-[1px] border-surface-mixed-2-200 text-surface-mixed-600"
                        placeholder="Add a new task"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    ></input>
                    <button
                        className="p-2 w-20 h-10 bg-primary-500 rounded-full font-bold"
                        onClick={addTodo}
                    >
                        Add
                    </button>
                </div>
                <div className="px-2">
                    <ul>
                        {todos.items &&
                            todos.items.map((todo) =>
                                isCompletedOrRemoved(todo.id) ? null : (
                                    <li key={todo.id}>
                                        <TodoCard
                                            title={todo.title}
                                            onCheck={() =>
                                                completeTodo(todo.id)
                                            }
                                            onDelete={() => deleteTodo(todo.id)}
                                        />
                                    </li>
                                )
                            )}
                    </ul>
                    <button onClick={() => sendData(todos)}>Send Data</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
