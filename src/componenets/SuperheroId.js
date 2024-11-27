import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery ,useQueryClient } from 'react-query';
//useQueryClient - used initial query data - avoide repeat api 
export const SuperheroId = () => {
  const { heroId } = useParams();
  const queryClient = useQueryClient()
  const fetchSuperHero = () =>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
  }
  const {isLoading, data , error, isError} = useQuery(['superhero', heroId],fetchSuperHero,{
    initialData : () => {
      const hero = queryClient.getQueryData('super-heroes')?.data?.find((hero) => hero.id === parseInt(heroId))
      return hero ? { data: hero } : undefined;
    }
  })
console.log(data)
  return (
    <div>
    <h1>Hero Details for ID: {heroId}</h1>
    {/* Add code here to fetch and display hero details based on heroId */}
    <div>{data?.data.name}<br/>
    {data?.data.alterEgo}</div>
  </div>
  )
}
