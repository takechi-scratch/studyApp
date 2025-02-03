import Header from "../../components/header";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen lg:px-8">
            <Header />
            <main className="flex min-h-screen flex-col justify-between p-24">
                <h1 className="text-4xl font-bold">アプリについて</h1>
                <p className="text-xl">現在作成中です！</p>
            </main>
        </div>
    );
}
