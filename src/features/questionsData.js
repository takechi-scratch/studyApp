export let currentDatabaseID = "";
export let currentBlocks = [];

export const changeDatabaseID = (id) => {
    if (!isIdValid(id)) {
        throw new Error("データベースIDの形式が不正です");
    }
    fetchBlockIndex(id);
    currentDatabaseID = id;
};

export const isIdValid = (id) => {
    if (id === "") {
        return false;
    }
    // IDが "official." または "custom." で始まるかどうかを判定
    return id.startsWith("official.") || id.startsWith("custom.");
};

const fetchGAS = async (method = "GET", gasID, query) => {
    const url = `https://script.google.com/macros/s/${gasID}/exec`
    const params = new URLSearchParams(query).toString();

    if (!["GET", "POST"].includes(method)) {
        throw new Error("メゾッド不正");
    }

    try {
        const response = await fetch(`${url}?${params}`, {method: method});
        if (!response.ok || !response.headers.get("Content-Type").startsWith("application/json")) {
            throw new Error("レスポンスエラー");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export const fetchBlockIndex = async (databaseID) => {
    if (!isIdValid(databaseID)) {
        throw new Error("正しいデータベースIDを入力してください");
    }

    let gasID;
    if (databaseID.startsWith("official.")) {
        throw new Error("公式データは未対応です");
    } else {
        gasID = databaseID.replace("custom.", "");
    }

    // ローカルストレージを取得
    const storage = JSON.parse(localStorage.getItem("blockIndex")) || {};

    if (Object.keys(storage).includes(gasID)) {
        console.log("キャッシュあり");
        console.log(storage[gasID]);
        const rawData = storage[gasID];

        // キャッシュが1時間以内の場合はキャッシュを返す
        if (Date.now() - rawData.timestamp < 3600000) {
            currentBlocks = rawData.blocks;
            return rawData.blocks;
        }
    }

    let response;
    try {
        response = await fetchGAS("GET", gasID, {type: "getIndex"});
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }

    // ローカルストレージに保存
    storage[gasID] = {timestamp: Date.now(), blocks: response};
    localStorage.setItem("blockIndex", JSON.stringify(storage));
    currentBlocks = response;

    return response;
};


export const fetchQuestions = async (databaseID) => {
    if (!isIdValid(databaseID)) {
        throw new Error("データベースIDの形式が不正です");
    }

    let gasID;
    if (databaseID.startsWith("official.")) {
        throw new Error("公式データは未対応です");
    } else {
        gasID = databaseID.replace("custom.", "");
    }

    // ローカルストレージを取得
    const storage = JSON.parse(localStorage.getItem("questions")) || {};

    if (Object.keys(storage).includes(gasID)) {
        const rawData = storage.gasID;

        // キャッシュが1時間以内の場合はキャッシュを返す
        if (Date.now() - rawData.timestamp < 3600000) {
            return rawData.questions;
        }
    }

    let response;
    try {
        response = await fetchGAS("GET", gasID, {type: "getQuestions"});
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }

    // ローカルストレージに保存
    storage[gasID] = {timestamp: Date.now(), questions: response};
    localStorage.setItem("questions", JSON.stringify(storage));

    return response;
};
