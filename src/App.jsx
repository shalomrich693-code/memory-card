import React, { useState, useEffect } from 'react';
import {GameHeader} from "./components/GameHeader";
import { Card } from "./components/Card";
import { WinMessage } from './components/WinMessage';
const cardValues =[
  "😊",
  "🤣",
  "😍",
  "😒",
  "😉",
  "😜",
  "😎",
  "😁",
  "😊",
  "🤣",
  "😍",
  "😒",
  "😉",
  "😜",
  "😎",
  "😁",
];
function App() {
  const [cards, setCards] =useState([]);
  const [flippedCards, setFlippedCards ] = useState([]);
  const [matchedCards, setMatchedCards ] = useState([]);
  const [score, setScore] = useState(0);
  const [move, setMove] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }


  const initializeGame = () =>{
    // SHUFFLE THE CARDS

    const shuffled = shuffleArray(cardValues);

   
    const finalCards = shuffled.map((value, index) => (
      {
         id: index,
         value,
         isFlipped: false,
         isMatched: false,
      }));

      setCards(finalCards);
      setIsLocked(false);
      setMove(0);
      setScore(0);
      setMatchedCards([]);
      setFlippedCards([]);
   };

   useEffect(() =>{
    initializeGame();
   }, []);


   const handleCardClick = (card) =>{
    // Don't allow clicking if the card is already flipped,matched
    if(card.isFlipped || card.isMatched || isLocked ||flippedCards.length ===2) {
      return;
    }
    
    // Update the card flipped state
    const newCards = cards.map((c) =>{
      if (c.id === card.id){
        return {...c, isFlipped:true};
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id]
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped

    if (flippedCards.length === 1){
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === card.value) {
        setTimeout(() =>{

          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          
          const newMatchedCards = cards.map((c) =>{
            if (c.id === card.id || c.id === firstCard.id) {
              return { ...c, isMatched: true};
            } else{
              return c;
            }
          });
          setScore((prev) => prev + 1);
          setCards((prev) => 
            prev.map((c) =>{
            if (c.id === card.id || c.id === firstCard.id) {
              return { ...c, isMatched: true};
            } else{
              return c;
            }
          })
        );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {

        //flip back card 1, card 2

        setTimeout(() =>{
            const flippedBackCard = newCards.map((c) => {
            if(newFlippedCards.includes(c.id) || c.id === card.id) {
              return {...c, isFlipped: false};
            } else {
              return c;
            }
          });
          
          setCards(flippedBackCard);
          setIsLocked(false);
          setFlippedCards([]);
        }, 1000);
      }

      setMove((prev) => prev + 1)
    }
   };

   const isGameComplete = matchedCards.length === cardValues.length;
  return (
    <div className="app">
      <GameHeader score={score} moves={move} onReset={initializeGame}/>
      {isGameComplete &&<WinMessage moves ={move}/>}
      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick}/>
        ))}
      </div>
    </div>
  );
}

export default App;
