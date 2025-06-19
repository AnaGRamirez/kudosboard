import React, { use, useEffect } from 'react';
import {useParams} from 'react-router-dom';

const BoardPage = () => {
    const {boardId} = useParams();
    const [cards, setCards] = useState([])

    // useEffect(() => {
    //     const fetchCards = async () => {
    //         try{
    //             const res = await fetch(B)
    //         }
    //     }
    // })
    // return (


    // )
}
export default BoardPage;