import "./globals.css";

export const metadata = {
    title: "テスト対策アプリ",
    description: "現在作成中です",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ja">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
