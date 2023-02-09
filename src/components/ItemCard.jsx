import React from "react";

const ItemCard = ({ title, thumbnail, price, permalink }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img src={thumbnail} alt={title} className="w-full" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">${price}</p>
    </div>
    <a href={permalink} target="_blank" rel="noopener noreferrer" className="px-6 py-4">
      Ver en Mercado Libre
    </a>
  </div>
);

export default ItemCard;