import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export const ParallelQuery = () => {
  const getSuperHero = () => {
    return axios.get("http://localhost:4000/superheroes");
  };

  const getFriends = () => {
    return axios.get("http://localhost:4000/friends");
  };
  const { data :superHero/*alaise name */} = useQuery("getSuperHero", getSuperHero);
  const { data : friends } = useQuery("getFriends", getFriends);

  return <div>ParallelQuery</div>;
};
