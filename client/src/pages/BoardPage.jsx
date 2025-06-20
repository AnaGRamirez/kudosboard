import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import CardGrid from "../components/CardGrid";
import CreateCardModal from "../components/CreateCardModal";
import {
  fetchCardsByBoardId,
  deleteCard,
  createCard,
  upvoteCard,
  togglePinCard,
} from "../api/BoardApi";
import "./BoardPage.css";

const BoardPage = () => {
  const {board_id} = useParams();
  const [cards, setCards] = useState([]);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const Navigate = useNavigate();

  const handleBack = () => {
    Navigate("/");
  };
  useEffect(() => {
    const getCards = async () => {
      try {
        const allCards = await fetchCardsByBoardId(board_id);
        const sorted = sortCardsByPinStatus(allCards);
        setCards(sorted);
      } catch (error) {
        console.log("could not fetch the cards", error);
      }
    };
    getCards();
  }, [board_id, cards]);

  const handleCreateCard = async (cardDetails) => {
    const {title, gifurl, author} = cardDetails;

    const newCard = await createCard({
      ...cardDetails,
      upvotes: 0,
      board_id: parseInt(board_id),
    });
    console.log("new card", newCard);
    setCards((previousCards) => [...previousCards, newCard]);
  };

  const handleDeleteCard = async (card_id) => {
    try {
      await deleteCard(card_id);
      setCards((previousCards) =>
        previousCards.filter((card) => card.id !== parseInt(card_id))
      );
      console.log("HAHA", card_id);
    } catch (error) {
      console.log("error when deleting card", error);
    }
  };

  const handleUpvote = async (card_id) => {
    console.log("elele", card_id);
    try {
      const updatedCard = await upvoteCard(card_id);
      setCards((previousCards) =>
        previousCards.map((card) =>
          card.id === card_id ? {...card, upvotes: card.upvotes + 1} : card
        )
      );
    } catch (error) {
      console.log("is it here", error);
    }
  };
  const handlePinToggle = async (card_id, newPinnedStatus) => {
    console.log("what up", newPinnedStatus);
    try {
      const updatedCard = await togglePinCard(card_id, newPinnedStatus);
      setCards((prevCards) =>
        prevCards.map((card) => (card.id === card_id ? updatedCard : card))
      );
    } catch (error) {
      console.log("failed to pin", error);
    }
  };

  const sortCardsByPinStatus = (cards) => {
    return [...cards].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
    });
  };

  return (
    <div className="board-page-container">
      <button onClick={handleBack} className="back-button">
        ← Home
      </button>
      <div className="board-page-header">
        <h3> Board {board_id}</h3>
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
        onPinToggle={handlePinToggle}
      />

       <footer className="site-footer">
        <p className="footer-catchphrase">
          Thanks for stopping by — see you in the terminal!
        </p>
        <p>&copy; 2025 Ana Ramirez</p>
      </footer>
    </div>
  );
};

export default BoardPage;
