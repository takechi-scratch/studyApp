"use client";

import { useState } from "react";
import Header from "../../components/header";

const MakeQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState("");
    const [titleText, setTitleText] = useState("");

    const handleAddQuestion = () => {
        setQuestions([...questions, { title: titleText, question: questionText, answer: answerText }]);
        setQuestionText("");
        setAnswerText("");
        setTitleText("");
    };

    const handleCreateSpreadsheet = async () => {
        const response = await fetch("/api/createSpreadsheet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ questions }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log(`Spreadsheet created: ${data.url}`);
        } else {
            console.error(`Error: ${data.error}`);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">問題作成</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">問題のタイトル</label>
                <input
                    type="text"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">問題</label>
                <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">答え</label>
                <input
                    type="text"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <button
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                問題を追加
            </button>
            <button
                onClick={handleCreateSpreadsheet}
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
                スプレッドシートを作成
            </button>
            <div className="mt-4">
                <h3 className="text-xl font-bold">追加された問題</h3>
                <ul className="list-disc pl-5">
                    {questions.map((q, index) => (
                        <li key={index}>
                            <p>タイトル: {q.title}</p>
                            <p>問題: {q.question}</p>
                            <p>答え: {q.answer}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default function Main() {
    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-8 lg:p-24 gap-8">
                <h1 className="text-4xl font-bold">問題作成</h1>
                <MakeQuestions />
                <button className="px-8 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 self-start" onClick={() => window.history.back()}>戻る</button>
            </main>
        </div>
    );
}
