import axios from "axios"
import { AddSuperHeroFunction, CustomHookUseQuery } from "../hooks/CustomHookUseQuery";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useQueryClient } from "react-query";//used query invalidation

const fetchSuperHeroes = () =>{
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHerospage = () => {

  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  const [id, setId] = useState('');

  const {isLoading, data , error, isError,isFetching , refetch} = CustomHookUseQuery(fetchSuperHeroes)
  const {mutate : insert}  = AddSuperHeroFunction();//post axiose insert value in db.json

  const handleSubmit = () => {
    const newId = data.data.length + 1; // Calculate the new ID
    setId(newId); // Schedule the state update

    console.log('New ID (immediate):', newId); // Log the new ID directly    console.log('New ID (immediate):', id); // Log the new value directly

    console.log('Alter Ego:', alterEgo);
    const hero = {id:newId, name , alterEgo}
    insert(hero)
    
  };  
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }
  if(isError){
    return <h2>{error.message}</h2>
  }
  return (<>
    <h2>RQ Super Heroes Page</h2>
    {/* <button onClick={refetch}>ReFetch</button> */}
    <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        name="alterEgo"
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
        placeholder="Enter your alter ego"
      />
      <button onClick={handleSubmit}>Submit</button>
    {data?.data.map(hero => { 
      return <div key={hero.id}>    
      <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
</div>
    })}
    {/* {data.map((hero) => {
return <div key={hero}>{hero}</div>
    })} */}
  </>)
  
}
