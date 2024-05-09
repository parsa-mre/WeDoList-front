import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ToDoDocument } from "../model/Todo";

const socket = new SockJS("http://localhost:8080/ws");
export const stompClient = Stomp.over(socket);

export const connect = async (
    id: string | undefined,
    callbackFunction: (message: any) => void
) => {
    if (stompClient.connected || !id) {
        return;
    }
    stompClient.connect({}, (frame) => {
        console.log("Connected: " + frame);
        stompClient.subscribe(`/topic/todo/${id}`, callbackFunction);
    });
};

export const sendData = async (
    todos: ToDoDocument,
    callbackFunction: () => void | undefined
) => {
    console.log("Data to send:", todos);
    if (stompClient.connected) {
        await stompClient.send(
            `/app/todo/${todos.id}/push`,
            {},
            JSON.stringify(todos)
        );
        console.log("Data sent:", todos);
    } else {
        if (callbackFunction) {
            await connect(todos.id, callbackFunction);
            await stompClient.send(
                `/app/todo/${todos.id}/push`,
                {},
                JSON.stringify(todos)
            );
        } else {
            console.error("Stomp client is not connected");
        }
    }
};
