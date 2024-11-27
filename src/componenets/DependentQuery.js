import axios from 'axios'
import React from 'react'
import { useQueries, useQuery } from 'react-query'

const fetchchannel = (email) =>{
  return axios.get(`http://localhost:4000/user/${email}`)
}
const fetchCourse = (channelId) =>{
  return axios.get(`http://localhost:4000/Channel/${channelId}`)
}
export const DependentQuery = ({email}) => {  
 // First query to fetch user data
 const { data: user, isLoading: isUserLoading, error: userError } = useQuery(
  ['user', email],
  () => fetchchannel(email)
);

// Extract channelId from user data
const channelId = user?.data?.channelId;

// Second query to fetch courses data, dependent on channelId
const { data: courses, isLoading: isCoursesLoading, error: coursesError } = useQuery(
  ['courses', channelId],
  () => fetchCourse(channelId),
  {
    enabled: !!channelId, // Only fetch courses when channelId is available
  }
);

// Handle loading and error states
if (isUserLoading) return <div>Loading user...</div>;
if (userError) return <div>Error loading user: {userError.message}</div>;

if (isCoursesLoading) return <div>Loading courses...</div>;
if (coursesError) return <div>Error loading courses: {coursesError.message}</div>;

return (
  <div>
    <h2>{user?.data.channelId}</h2>
    <h2>{courses?.data.courses}</h2>
  </div>
  )
}
