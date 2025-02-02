export const isIdValid = (id) => {
    if (id === "") {
        return false;
    }
    // IDが "official." または "custom." で始まるかどうかを判定
    return id.startsWith("official.") || id.startsWith("custom.");
};

export const fetchProblemData = async (problemId) => {
    if (!isIdValid(problemId)) {
        throw new Error("Invalid ID");
    }

    let gasID;
    if (problemId.startsWith("official.")) {
        throw new Error("Official problem data is not supported yet");
    } else {
        gasID = problemId.replace("custom.", "");
    }

    try {
        const response = await fetch(`https://script.google.com/macros/s/${gasID}/exec?type=getIndex`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
