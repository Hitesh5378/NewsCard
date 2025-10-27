import React, { createContext, useContext, useReducer } from 'react';

const NewsContext = createContext();

const initialState = {
  articles: [],
  loading: true,
  currentPage: 1,
  removedIds: [],
  itemsPerPage: 6
};

const newsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'REMOVE_ARTICLE':
      return {
        ...state,
        removedIds: [...state.removedIds, action.payload]
      };
    default:
      return state;
  }
};

export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

