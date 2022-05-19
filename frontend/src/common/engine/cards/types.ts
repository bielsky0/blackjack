export const Types = ["Heart", "Club", "Spade", "Diamond"] as const;
export const Values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"] as const;

export type CardType = typeof Types[number];
export type CardValue = typeof Values[number];
