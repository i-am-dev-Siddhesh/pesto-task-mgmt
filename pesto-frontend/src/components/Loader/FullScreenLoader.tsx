import React from "react";

const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-5 bg-white p-5 rounded-md">
                    <div className="animate-spin rounded-full border-t-4 border-green-500 border-solid h-16 w-16"></div>
                    <p className="text-3xl">Loading...</p>
                </div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
