import Header from "../../components/header";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex flex-col justify-between p-24 gap-8">
                <h1 className="text-4xl font-bold">アプリについて</h1>
                <p className="text-xl">一問一答のクイズを出題します。問題を自由に作れるようになる予定です！</p>
                <p className="text-xl">現在作成中です！</p>
            </main>
        </div>
    );
}
