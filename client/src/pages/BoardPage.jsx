import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import CardGrid from "../components/CardGrid";
import CreateCardModal from "../components/CreateCardModal";
import {
  fetchCardsByBoardId,
  deleteCard,
  createCard,
  upvoteCard,
} from "../api/BoardApi";
import "./BoardPage.css";

const BoardPage = () => {
  const {boardId} = useParams();
  const [cards, setCards] = useState([]);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const Navigate = useNavigate();

  const handleBack = () => {
    Navigate("/");
  };
  useEffect(() => {
    const getCards = async () => {
      try {
        const allCards = await fetchCardsByBoardId(boardId);
        setCards(allCards);
      } catch (error) {
        console.log("could not fetch the cards", error);
      }
    };
    getCards();
  }, [boardId, cards]);

  const handleCreateCard = async (cardDetails) => {

    const {title, gifurl, author} = cardDetails;

    const newCard = await createCard({
      ...cardDetails,
      upvotes: 0,
      board_id: parseInt(boardId),
    });
    console.log("new card", newCard);
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      setCards((prevCards) =>
        prevCards.filter((card) => card.id !== parseInt(cardId))
      );
      console.log("HAHA", cardId)
    } catch (error) {
      console.log("error when deleting card", error);
    }
  };

  const handleUpvote = async (cardId) => {
    console.log("elele", cardId)
    try {
      const updatedCard = await upvoteCard(cardId);
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId ? {...card, upvotes: card.upvotes + 1}: card
        )
      );

    }
  
     catch (error) {
      console.log("is it here", error)
    }
  };

  return (
    <div className="board-page-container">
      <button onClick={handleBack} className="back-button">
        ← Home
      </button>
      <div className="board-page-header">
        <h3> Board {boardId}</h3>
        <button
          className="create-card-button"
          onClick={() => setShowCreateCardModal(true)}
        >
          Create a Card
        </button>
      </div>
      {showCreateCardModal && (
        <CreateCardModal
          onClose={() => setShowCreateCardModal(false)}
          onCreate={handleCreateCard}
        />
      )}
      <CardGrid
        cards={cards}
        onDelete={handleDeleteCard}
        onUpvote={handleUpvote}
      />
    </div>
  );
};

export default BoardPage;
