"use client";

import { useState } from "react";
// app routerを使うときはこっち！！
import { useRouter } from 'next/navigation';

import Header from "../components/header";
import { currentDatabaseID, changeDatabaseID } from "@/features/questionsData";

export default function Home() {
    const [databaseID, setDatabaseID] = useState(currentDatabaseID);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleFetchData = async () => {
        try {
            await changeDatabaseID(databaseID);
            router.push("/blocks");
        } catch (error) {
            setErrorMessage(error.message);
            // エラーメッセージを3秒後に消す
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-24">
                <h1 className="text-4xl font-bold">テスト対策アプリ</h1>
                <p className="text-xl">現在製作中です！ぜひ改善にご協力ください！</p>
                <div className="flex flex-col gap-y-4 rounded p-4 bg-gray-50 max-w-sm mx-auto">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="problem-id" className="text-lg">データベースID</label>
                        <input
                            type="text"
                            id="problem-id"
                            name="problem-id"
                            className="p-2 border border-gray-300 rounded-md"
                            value={databaseID}
                            onChange={(e) => setDatabaseID(e.target.value)}
                        />
                    </div>
                    <button className="p-2 bg-blue-500 text-white rounded-md" onClick={handleFetchData}>
                        挑戦！
                    </button>
                    {errorMessage && (
                            <div className="fixed top-4 right-4 bg-red-300 p-4 rounded shadow-lg">
                                {errorMessage}
                            </div>
                        )}
                </div>
            </main>
        </div>


    );
}
