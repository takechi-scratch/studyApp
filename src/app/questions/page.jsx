"use client";

import { useSearchParams } from "next/navigation";

import Header from "../../components/header";
import { currentDatabaseID, currentBlocks } from "@/features/questionsData";

const Questions = () => {
    const searchParams = useSearchParams();
    const blockID = searchParams.get("blockID");

    return (
        <p>ブロックID: {blockID}</p>
    );
}

export default function Main() {
    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-24">
                <h1 className="text-4xl font-bold">問題</h1>
                {Questions()}
            </main>
        </div>
    );
}
