"use client";

import { useState } from "react";

export default function Message({text, className, keepTime = 3000}) {
    const [errorMessage, setErrorMessage] = useState(text);
    if (keepTime > 0) {
        setTimeout(() => setErrorMessage(""), keepTime);
    }

    if (errorMessage === "") {
        return (<></>);
    }

    return (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${className}`}>
            {errorMessage}
        </div>
    );
}
