import { google } from "googleapis";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send({ message: "Only POST requests are allowed" });
    }

    const { questions } = req.body;

    const auth = new google.auth.GoogleAuth({
        keyFile: "massive-runway-437609-a5-6158a95f2d58.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    try {
        const spreadsheet = await sheets.spreadsheets.create({
            resource: {
                properties: {
                    title: "問題集",
                },
                sheets: [
                    {
                        properties: {
                            title: "index",
                        },
                        data: [
                            {
                                rowData: [
                                    {
                                        values: [
                                            { userEnteredValue: { stringValue: "ID" } },
                                            { userEnteredValue: { stringValue: "問題のタイトル" } },
                                        ],
                                    },
                                    ...questions.map((q, index) => ({
                                        values: [
                                            { userEnteredValue: { stringValue: `id_${index}` } },
                                            { userEnteredValue: { stringValue: q.title } },
                                        ],
                                    })),
                                ],
                            },
                        ],
                    },
                    ...questions.map((q, index) => ({
                        properties: {
                            title: `id_${index}`,
                        },
                        data: [
                            {
                                rowData: [
                                    {
                                        values: [
                                            { userEnteredValue: { stringValue: "問題" } },
                                            { userEnteredValue: { stringValue: "答え" } },
                                        ],
                                    },
                                    {
                                        values: [
                                            { userEnteredValue: { stringValue: q.question } },
                                            { userEnteredValue: { stringValue: q.answer } },
                                        ],
                                    },
                                ],
                            },
                        ],
                    })),
                ],
            },
        });

        res.status(200).json({ url: spreadsheet.data.spreadsheetUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
