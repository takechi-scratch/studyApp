"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Header from "../../components/header";
import { currentDatabaseID, fetchQuestions } from "@/features/questionsData";

const Questions = () => {
    const searchParams = useSearchParams();
    const blockID = searchParams.get("blockID");
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        fetchQuestions(currentDatabaseID, blockID).then((data) => {
            setQuestions(data);
        });
    }, [blockID]);

    const handleToggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
        setShowAnswer(false);
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
        setShowAnswer(false);
    };

    if (questions.length === 0) {
        return <p>Loading...</p>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <p className="text-lg font-semibold mb-2">ID: {currentQuestion.id}</p>
            <div className="cursor-pointer mb-4">
                <p className="text-xl">{currentQuestion.question}</p>
            </div>
            <button className="p-4 border border-gray-300 rounded-md text-left hover:bg-gray-50 w-full" onClick={handleToggleAnswer}>
                <p className={`${showAnswer && "text-green-600"} p-1`}>{showAnswer ? currentQuestion.answer : "答えを表示"}</p>
            </button>
            <div className="flex justify-between space-x-4 mt-4">
                <button className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handlePrevQuestion}>前の問題</button>
                <button className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleNextQuestion}>次の問題</button>
            </div>
        </div>
    );
}

export default function Main() {
    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-8 lg:p-24 gap-8">
                <h1 className="text-4xl font-bold">問題</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <Questions />
                </Suspense>
                <button className="px-8 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 self-start" onClick={() => window.history.back()}>戻る</button>
            </main>
        </div>
    );
}
