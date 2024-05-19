import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
  const formatId = (id) => {
    return `#${id.toString().padStart(3, "0")}`;
  };
  const formatValue = (value) => {
    return Math.floor(value * 10) / 10;
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((poke) => {
          return (
            <div
              className="card"
              key={poke.id}
              onClick={() => infoPokemon(poke)}
            >
              <h2>{formatId(poke.id)}</h2>
              <img src={poke.sprites.front_default} alt={poke.name} />
              <h2>{poke.name}</h2>
              <div className="info">
                <div className="weight">
                  Peso: {formatValue(poke.weight / 10)} kg
                </div>
                <div className="types">
                  {poke.types.map((type, index) => (
                    <div key={index} className={`type ${type.type.name}`}>
                      {type.type.name}
                    </div>
                  ))}
                </div>
                <div className="height">
                  Altura: {formatValue(poke.height)} cm
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Card;
