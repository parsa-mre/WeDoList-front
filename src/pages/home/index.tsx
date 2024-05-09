import { createTodo } from "../../services/TodoService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const createNewList = () => {
        createTodo().then((data) => {
            console.log(data);
            navigate("/todo/" + data.id);
        });
    };

    return (
        <div className="h-[100vh] w-full bg-surface-mixed-2-100 flex items-center justify-center">
            <div className="p-2 h-36 w-[32rem] bg-blue flex-col gap-2 content-center">
                <h1 className="p-2 py-3 text-4xl text-white font-bold">
                    Connect Using an ID
                </h1>
                <form
                    action=""
                    className="px-2 inline-flex gap-2 items-center justify-center"
                >
                    <input
                        type="text"
                        className="px-3 p-2 h-10 w-96 rounded-lg bg-transparent border-[1px] border-surface-mixed-2-200 text-surface-mixed-600"
                        placeholder="To Do List ID"
                    ></input>
                    <button
                        type="submit"
                        className="p-2 w-20 h-10 bg-primary-500 rounded-full font-bold"
                    >
                        Join
                    </button>
                </form>
                <div className="p-2 inline-flex">
                    <p className="text-white">Don’t have To Do List ID? </p>
                    <button
                        className="px-2 text-primary-600 font-bold"
                        onClick={createNewList}
                    >
                        Create a new To Do List.
                    </button>
                </div>
                <p className="p-2 mt-4 text-sm text-surface-600">
                    Get organized with our collaborative to-do list app! Easily
                    connect with friends, family, or colleagues using a unique
                    To-Do List ID to work on tasks together. Simply enter the
                    To-Do List ID to join an existing list or create a new one
                    if you don't have an ID yet. Start collaborating and staying
                    on top of tasks effortlessly!
                </p>
            </div>
        </div>
    );
};

export default HomePage;
