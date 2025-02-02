"use client";

import { useState } from "react";
import Header from "../../components/header";

export default function Home() {
    const [problemId, setProblemId] = useState("");

    const handleFetchData = async () => {
        console.log(problemId);
    };

    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-24">
                <h1 className="text-4xl font-bold">問題一覧</h1>
                <div className="flex flex-col gap-y-4 rounded p-4 bg-gray-50 max-w-sm mx-auto">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="problem-id" className="text-lg">データベースID</label>
                        <input
                            type="text"
                            id="problem-id"
                            name="problem-id"
                            className="p-2 border border-gray-300 rounded-md"
                            value={problemId}
                            onChange={(e) => setProblemId(e.target.value)}
                        />
                    </div>
                    <button className="p-2 bg-blue-500 text-white rounded-md" onClick={handleFetchData}>
                        送信
                    </button>
                </div>
            </main>
        </div>


    );
}
