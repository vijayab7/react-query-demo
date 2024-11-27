import axios from 'axios';
import React from 'react'
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';

export const Overview = () => {

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {

  const fetchrecord = () =>{
    return axios.get(`https://api.github.com/repos/TanStack/query`)
  }
  const { data , isLoading , error } = useQuery("repoData", fetchrecord);
  if (isLoading) return 'Loading...'

  if (error)   return <h2>{error.message}</h2>

  return (
    <div>
      <h1>{data?.data.name}</h1>
      <p>{data?.data.description}</p>
      <strong>{data?.data.subscribers_count}</strong>{' '}
      <strong>{data?.data.stargazers_count}</strong>{' '}
      <strong>{data?.data.forks_count}</strong>
    </div>
  )
}
