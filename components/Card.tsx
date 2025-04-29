import React from 'react';
import { Card as CardType } from '../types/card';

interface Props {
  card: CardType;
}

export const Card: React.FC<Props> = ({ card }) => (
  <div className="card">
    <h3 className="card__title">{card.title}</h3>
    <p className="card__text">{card.text}</p>
  </div>
);