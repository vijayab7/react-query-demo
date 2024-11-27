import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const addSuperHero = (hero) => {
  console.log(hero)
  return axios.post("http://localhost:4000/superheroes", hero);
};
export const CustomHookUseQuery = (fetchSuperHeroes) => {
  let SuperHeroNames;

  return useQuery("super-heroes", fetchSuperHeroes, {
    //call backs
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
    //retry : false,//console ah 4 times render achu so 1 time ah api call panaa use panranga
    // select : (data) => {
    //   SuperHeroNames = data.data.map((hero) => hero.name)
    //   return SuperHeroNames
    // }
  });
};
export const AddSuperHeroFunction = () => {
  const queryClient = useQueryClient(); //posted data get without refresh
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      //queryClient.invalidateQueries("super-heroes"); //posted data get without refresh
      queryClient.setQueryData('super-heros',(oldQuerydata) =>{
        return{
          ...oldQuerydata,
          data:[...oldQuerydata.data,data.data]
        }
      })
    },
  }); //post data
};
