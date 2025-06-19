import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import CardGrid from "../components/CardGrid";
import CreateCardModal from "../components/CreateCardModal";
import {fetchCardsByBoardId, deleteCard, createCard} from "../api/BoardApi";
import "./BoardPage.css";

const BoardPage = () => {
  const {boardId} = useParams();
  const [cards, setCards] = useState([]);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const Navigate = useNavigate();

  const handleBack = () => {
    Navigate("/home");
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

  const handleCreateCard = (cardDetails) => {
    const createCardAsync = async () => {
      try {
        const newCard = await createCard({
          ...cardDetails,
          board_id: parseInt(boardId),
        });
      } catch (error) {
        console.log("error in creating card", error);
      }
    };
    createCardAsync();
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      console.log(cardId);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.log("error when deleting card", error);
    }
  };

  const handleUpvote = (cardId) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? {...card, upvotes: card.upvotes + 1} : card
      )
    );
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
      ></CardGrid>
    </div>
  );
};

export default BoardPage;
