import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, createContext } from 'react';

const databaseContext = createContext();

export async function getQuestions(url, query) {
    try {
        const queryString = new URLSearchParams(query).toString();

        const response = await fetch(`${url}?${queryString}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch questions:', error);
        throw error;
    }
}

export const BlocksProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [databaseID, setDatasetID] = useState("");

    useEffect(() => {
        if (databaseID) {
            const fetchQuestions = async () => {
                try {
                    const query = {type: "getIndex"};
                    const data = await getQuestions(`https://script.google.com/macros/s/${databaseID}/exec`, query);
                    setQuestions(data);
                } catch (error) {
                    console.error('Error fetching questions:', error);
                }
            };

            fetchQuestions();
        }
    }, [databaseID]);

    const value = useMemo(() => ({ questions, setDatasetID }), [questions, setDatasetID]);

    return (
        <databaseContext.Provider value={value}>
            {children}
        </databaseContext.Provider>
    );
};

BlocksProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default databaseContext;
