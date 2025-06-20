import React from "react";
import Card from "./Card";
import './CardGrid.css'

const CardGrid = ({cards, onDelete, onUpvote, onPinToggle}) => {
  const renderCards = () => {
    if (cards.length === 0) {
      return (
        <div className="message">
          <h3> No cards yet for this board</h3>
        </div>
      );
    }

    return (
      <div className="card-grid-container">
        <div className="card-grid">
  {cards.map((card) => (

          <Card
            key={card.id}
            title={card.title}
            gifurl={card.gifurl}
            upvotes={card.upvotes}
            onUpvote={()=> onUpvote(card.id)}
            pinned={card.pinned}
            onDelete={()=> onDelete(card.id)}
            onPinToggle={()=> onPinToggle(card.id, !card.pinned)}
          ></Card>
        ))}
        </div>
      
      </div>
    );
  };
  return renderCards();
};


export default CardGrid;