import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export const Paginatedqueries = () => {
  const fetchColors = () =>{
    return axios.get(`http://localhost:4000/colors`)
  }
  const { data , isLoading , error } = useQuery("fetchColors", fetchColors);
  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if(error){
    return <h2>{error}</h2>
  }

  return (
    <div>
    <h2>Colors</h2>
    <ul>
      {data?.data.map((color) => (
        <li key={color.label}>{color.label}</li>
      ))}
    </ul>
  </div>
  );
  
}
