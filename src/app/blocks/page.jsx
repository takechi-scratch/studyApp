"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Header from "../../components/header";
import { currentDatabaseID, currentBlocks } from "@/features/questionsData";

function Blocks() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (blockID) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('blockID', blockID);
        router.push(`/questions?${newParams.toString()}`);
    };

    if (currentDatabaseID === "") {
        return (
            <p className="text-xl">データベースIDを入力してください</p>
        );
    }

    if (currentBlocks.length === 0) {
        return (
            <p className="text-xl">問題がありません</p>
        );
    }

    // descriptions: "授業で扱った文章の内容・文法の問題です。"
    // id: "class_genbun"
    // questions : 234
    // title: "言語文化（授業内容）"
    // type: []
    // views: 0

    return (
        <div className="grid grid-cols-3 gap-4 mt-4">
            {currentBlocks.map((block) => (
                        <button key={block.id} onClick={() => handleClick(block.id)} className="p-4 border border-gray-300 rounded-md text-left">                    <h2 className="text-lg font-bold">{block.title}</h2>
                    <p>{block.descriptions}</p>
                    <p>問題数: {block.questions}問</p>
                    <p>閲覧数: {block.views}回</p>

                </button>
            ))}
        </div>
    );
}


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-24">
                <h1 className="text-4xl font-bold">問題一覧</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <Blocks />
                </Suspense>
            </main>
        </div>
    );
}
