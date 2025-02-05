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
        console.log(`${url}?${params}`);
        const response = await fetch(`${url}?${params}`, {method: method});
        if (!response.ok || !response.headers.get("Content-Type").startsWith("application/json")) {
            throw new Error("GoogleAppsScriptにてエラーが発生しました");
        }

        const rawData = await response.json();

        if (rawData.status !== "OK") {
            throw new Error(rawData.status);
        }

        return rawData.data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

const parseDatabaseID = (databaseID) => {
    let gasID;
    let type;
    if (databaseID.startsWith("official.")) {
        throw new Error("公式データは未対応です");
    } else {
        gasID = databaseID.replace("custom.", "");
        type = "custom";
    }
    return [gasID, type];
};

export const fetchBlockIndex = async (databaseID) => {
    if (!isIdValid(databaseID)) {
        throw new Error("正しいデータベースIDを入力してください");
    }

    let [gasID, type] = parseDatabaseID(databaseID);

    // ローカルストレージを取得
    const storage = JSON.parse(localStorage.getItem("blockIndex")) || {};

    if (Object.keys(storage).includes(gasID)) {
        console.log("Chache hit");
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


export const fetchQuestions = async (databaseID = "", blockID) => {
    if (databaseID === "") {
        databaseID = currentDatabaseID;
    }

    let [gasID, type] = parseDatabaseID(databaseID);

    // ローカルストレージを取得
    const storage = JSON.parse(localStorage.getItem("questions")) || {};

    if (Object.keys(storage).includes(`${gasID}.${blockID}`)) {
        const rawData = storage[`${gasID}.${blockID}`];

        // キャッシュが1時間以内の場合はキャッシュを返す
        if (Date.now() - rawData.timestamp < 3600000) {
            return rawData.questions;
        }
    }

    let response;
    try {
        response = await fetchGAS("GET", gasID, {type: "getQuestions", questionsID: blockID});
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }

    // ローカルストレージに保存
    storage[`${gasID}.${blockID}`] = {timestamp: Date.now(), questions: response};
    localStorage.setItem("questions", JSON.stringify(storage));

    console.log(response);
    return response;
};
