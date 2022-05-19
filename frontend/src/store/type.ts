import { Player } from "../common/engine/blackjackEngine";
import { Card } from "../common/engine/cards/card";

export interface GameState {
    deck: Array<Card>;
    cardsInGame: Array<Card>;
    cardIdx: number;
    players: Player[];
    shuffleDeck: () => void;
    addCardToPlayer: (player: Player) => void;
    returnCardsToDeck: () => void;
}
