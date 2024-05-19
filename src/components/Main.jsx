import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    await getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (results) => {
    const promises = results.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    });
    const pokemonData = await Promise.all(promises);
    setPokeData((prevData) => {
      const newData = [...prevData, ...pokemonData];
      const uniqueData = Array.from(new Set(newData.map((p) => p.id))).map(
        (id) => newData.find((p) => p.id === id)
      );
      uniqueData.sort((a, b) => (a.id > b.id ? 1 : -1));
      return uniqueData;
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="left-content">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />
          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}
            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};

export default Main;
