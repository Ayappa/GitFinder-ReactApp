import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import githubReducer from './githubReducer';
import {
SEARCH_USERS,
SET_LOADING,
// SET_ALERT,
GET_REPOS,
GET_USER,
CLEAR_USERS
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !=='production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;  
}

const GithubState =  props=> {
    const initialState = {
        users: [],
        user : {},
        repos: [],
        loading: false
    }
    const [state , dispatch] =useReducer (githubReducer, initialState);


    const searchUsers= async (text)=> {
        setloading();
          const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        // setUsers ( res.data.items);
         // setloading(false);
      dispatch({type:SEARCH_USERS,
    payload: res.data});
        };


        const setloading=()=> dispatch({type: SET_LOADING});

        const getUser=async (username)=> {
           // this.setloading(true);
            const res = await axios.get(`https://api.github.com/users/${username}?&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
           dispatch({
               type: GET_USER,
               payload: res.data
           })
          }

        const clearUsers= () => {
           dispatch({type: CLEAR_USERS});
         
           }

           const getUserRepos=async (username)=> {
           //setloading(true);
            const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
            dispatch({
                type:GET_REPOS,
                payload: res.data
            });
        
          }


         

    return <GithubContext.Provider
    value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading:state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
        }}
>

    {props.children}
</GithubContext.Provider>

    
}

export default GithubState;