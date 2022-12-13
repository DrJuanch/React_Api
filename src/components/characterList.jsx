import { useEffect, useState } from "react";
import Character from "./character";

function NavPage(props){
  return (
    <div className="d-flex justify-content-between añign-items-center">
      <p>Page: {props.page}</p>
      <button type="button" className="btn btn-primary btn-sm" onClick = {() => props.setPage(props.page + 1)}>
        Page {props.page + 1}
      </button>
    </div>
  )
}


function CharacterList() {
  const [characters, setcharacters] = useState([]); //guardar datos para verla en interfaz
  const [loading, setloading] = useState(true);
  const [Page, setPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${Page}`);
      const data = await response.json(); //entender la petición
      setloading(false);
      setcharacters(data.results);
    }
    fetchData();
  }, [Page]);

  if (loading) {
    return <div>Cargando</div>;
  }

  return (
    <div className="container">



      <NavPage page={Page} setPage={setPage}/>

      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}

      <NavPage page={Page} setPage={setPage}/>

    </div>
  );
}
export default CharacterList;
