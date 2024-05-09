import React from "react";
import { FaCheck } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

interface TodoCardProps {
    title: string;
    onCheck: () => void;
    onDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ title, onCheck, onDelete }) => {
    return (
        <div className="p4 my-2 p-2 h-14 w-[29rem] rounded-lg bg-surface-mixed-200 hover:bg-surface-mixed-300 items-center flex justify-between transition-all">
            <p className=" px-2 text-white font-semibold">{title}</p>
            <div className="flex gap-4 text-primary-500">
                <button onClick={onCheck}>
                    <FaCheck size={16} />{" "}
                </button>
                <button onClick={onDelete}>
                    <FaTrash size={16} />
                </button>
            </div>
        </div>
    );
};

export default TodoCard;
