import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="h-[100vh] w-full bg-surface-mixed-2-100 flex items-center justify-center">
            <div className="p-2 h-36 w-[32rem] bg-blue flex-col gap-2 content-center">
                <h1 className="p-2 py-3 text-4xl text-white font-bold">
                    404 Not Found
                </h1>
                <button
                    className="p-2 w-20 h-10 bg-primary-500 rounded-full font-bold"
                    onClick={() => navigate("/")}
                >
                    Home
                </button>
            </div>
        </div>
    );
};
