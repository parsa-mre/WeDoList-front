import { ToDoDocument } from "../model/Todo";
import Api from "../utils/Api";

export const getTodos = async (
    id: string | undefined
): Promise<ToDoDocument | null> => {
    if (!id) return null;
    try {
        const response = await Api.get("/todos/" + id);
        return response.data as ToDoDocument;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createTodo = async () => {
    try {
        const response = await Api.post("/todos");
        return response.data;
    } catch (error) {
        console.error(error);
        return {};
    }
};
