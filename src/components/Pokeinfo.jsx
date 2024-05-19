import React from "react";
import pokemonImage from "../assets/background.png";
const Pokeinfo = ({ data }) => {
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <div
            className="image-container"
            style={{ backgroundImage: `url(${pokemonImage})` }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            />
          </div>
          <div className="skills">
            {data.abilities.map((poke) => {
              return (
                <>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </>
              );
            })}
          </div>
          <div className="base-stat">
            {data.stats.map((stat, index) => (
              <div key={index} className="stat">
                <span className="stat-name">{stat.stat.name}:</span>
                <span className="stat-value">{stat.base_stat}</span>
                <progress
                  className="stat-progress"
                  value={stat.base_stat}
                  max={100}
                ></progress>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default Pokeinfo;
