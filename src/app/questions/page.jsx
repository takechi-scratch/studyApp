"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";

import Header from "../../components/header";
import { currentDatabaseID, fetchQuestions } from "@/features/questionsData";
import Message from "@/components/message";

const Questions = ({questions, isRandom, includesFeedback}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showIDSelector, setShowIDSelector] = useState(false);

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

    const currentQuestion = questions[currentQuestionIndex];

    let answer = "答えを表示";
    if (showAnswer) {
        if (includesFeedback) {
            answer = `${currentQuestion.answer}\n${currentQuestion.feedback}`;
        } else {
            answer = currentQuestion.answer;
        }
    }

    const inputRef = useRef(null);

    return (
        <div className="p-4 bg-white rounded shadow-md relative z-10">
            <p className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => setShowIDSelector(true)}>ID: {currentQuestion.id}</p>
            {showIDSelector && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white border border-gray-300 rounded shadow-md p-4">
                        <input
                            type="text"
                            className="border p-2 mb-4 w-full"
                            placeholder="IDを入力"
                            ref={inputRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const index = questions.findIndex(q => String(q.id) === e.target.value);
                                    setShowIDSelector(false);
                                    if (index !== -1) {
                                        setCurrentQuestionIndex(index);
                                        setShowAnswer(false);
                                    }
                                }
                            }}
                        />
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => setShowIDSelector(false)}>閉じる</button>
                    </div>
                </div>
            )}

            <div className="cursor-pointer mb-4 min-h-24 lg:min-h-8">
                <p className="text-xl">{currentQuestion.question}</p>
            </div>
            <button className="p-4 border border-gray-300 rounded-md text-left hover:bg-gray-50 w-full" onClick={handleToggleAnswer}>
                <p className={`${showAnswer && "text-green-600"} p-1`}>{answer}</p>
            </button>
            <div className="flex justify-between space-x-4 mt-4">
                <button className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handlePrevQuestion}>前の問題</button>
                <button className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleNextQuestion}>次の問題</button>
            </div>
        </div>
    );
}

const Settings = ({isRandom, setIsRandom, includesFeedback, setIncludesFeedback, setQuestions}) => {
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const refresh = () => {
        fetchQuestions(currentDatabaseID, blockID, false).then((data) => {
            setQuestions(data);
            setMessage("データを再読み込みしました！"); // 一度しか出てこないバグあり
        });
    };

    const handleToggleRandom = () => {
        setIsRandom(!isRandom);
    };

    const handleToggleFeedback = () => {
        setIncludesFeedback(!includesFeedback);
    };

    return (
        <div className="relative">
            <button className="p-4 border border-gray-300 rounded-md text-left hover:bg-gray-50 w-full" onClick={toggleMenu}>
                <p>設定</p>
                {isOpen && (
                    <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <ul>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <label>
                                    <input type="checkbox" checked={isRandom} onChange={handleToggleRandom} />
                                    ランダム
                                </label>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <label>
                                    <input type="checkbox" checked={includesFeedback} onChange={handleToggleFeedback} />
                                    フィードバックを含む
                                </label>
                            </li>
                        </ul>
                        <button className="px-8 py-2 bg-red-500 text-white rounded hover:bg-red-700 self-start" onClick={refresh}>キャッシュなしで再読み込み</button>
                    </div>
                )}
            </button>
            {message && <Message text={message} className="bg-green-300" />}
        </div>
    );
}


const Root = () => {
    const [questions, setQuestions] = useState(null);
    const [isRandom, setIsRandom] = useState(false);
    const [includesFeedback, setIncludesFeedback] = useState(false);

    const searchParams = useSearchParams();
    const blockID = searchParams.get("blockID");

    useEffect(() => {
        fetchQuestions(currentDatabaseID, blockID).then((data) => {
            setQuestions(data);
        });
    }, [blockID]);

    if (!questions) {
        return <p>読み込み中...</p>;
    }

    if (questions.length === 0) {
        return <p>問題がありません。</p>;
    }

    return (
        <>
            <Questions questions={questions} isRandom={isRandom} includesFeedback={includesFeedback} />
            <Settings isRandom={isRandom} setIsRandom={setIsRandom} includesFeedback={includesFeedback} setIncludesFeedback={setIncludesFeedback} setQuestions={setQuestions} />
        </>
    );
}

export default function Main() {
    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-8 lg:p-24 gap-8">
                <h1 className="text-4xl font-bold">問題</h1>
                <Suspense fallback={<div>読み込み中...</div>}>
                    <Root />
                </Suspense>
                <button className="px-8 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 self-start" onClick={() => window.history.back()}>戻る</button>
            </main>
        </div>
    );
}
