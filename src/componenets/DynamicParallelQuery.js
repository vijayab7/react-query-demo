import axios from 'axios'
import React from 'react'
import { useQueries } from 'react-query'

const fetchSuperHero = (heroId) =>{
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}
export const DynamicParallelQuery = ( {heroIds}) => {
  const userQueries = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['user', id],
        queryFn: () => fetchSuperHero(id),
      }
    }),
  )
  console.log(userQueries)
  return (
    <div></div>
  )
}
