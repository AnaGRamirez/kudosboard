import React from 'react';
import {useParams} from 'react-router-dom';

const BoardPage = () => {
    const {boardId} = useParams();

    return (
        <div >
            <h1>
                "Hi thanks for visiting" {boardId}
            </h1>
        </div>

    )
}
export default BoardPage;