"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import Header from "../../components/header";
import { currentDatabaseID, fetchBlockIndex } from "@/features/questionsData";
import { EyeIcon, Squares2X2Icon } from "@heroicons/react/24/outline";


function Blocks() {
    const [blocks, setBlocks] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (blockID) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('blockID', blockID);
        router.push(`/questions?${newParams.toString()}`);
    };

    if (currentDatabaseID === "") {
        router.push("/"); // やっぱり、バグになるみたい
        return (
            <p className="text-xl">データベースIDを入力してください</p>
        );
    }

    useEffect(() => {
        fetchBlockIndex(currentDatabaseID).then((data) => {
            setBlocks(data);
        });
    }, [currentDatabaseID]);

    if (!blocks) {
        return <p>読み込み中...</p>;
    }

    if (blocks.length === 0) {
        return <p>問題ブロックがありません。</p>;
    }

    // descriptions: "授業で扱った文章の内容・文法の問題です。"
    // id: "class_genbun"
    // questions : 234
    // title: "言語文化（授業内容）"
    // type: []
    // views: 0

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            {blocks.map((block) => (
                <button key={block.id} onClick={() => handleClick(block.id)} className="p-4 border border-gray-300 rounded-md text-left">
                    <h2 className="text-lg font-bold">{block.title}</h2>
                    <p>{block.descriptions}</p>
                    <div className="flex gap-4 mt-3">
                        <div className="flex items-center">
                            <Squares2X2Icon className="h-5 w-5 mr-1" />
                            {block.questions}
                        </div>
                        <div className="flex items-center">
                            <EyeIcon className="h-5 w-5 mr-1" />
                            {block.views}
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}


export default function Home() {
    const router = useRouter();

    const refresh = () => {
        fetchBlockIndex(currentDatabaseID, false).then(() => {
            toast("データを再読み込みしました！", {
                style: { background: "#86efac", color: "#000" },
            });
        });
    };

    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-24 gap-8">
                <h1 className="text-4xl font-bold">問題一覧</h1>
                <Suspense fallback={<div>読み込み中...</div>}>
                    <Blocks />
                </Suspense>
                <button className="px-8 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 self-start" onClick={() => router.push("/")}>ホームへ</button>
                <button className="px-8 py-2 bg-red-500 text-white rounded hover:bg-red-700 self-start" onClick={() => refresh()}>キャッシュなしで再読み込み</button>
            </main>
        </div>
    );
}
