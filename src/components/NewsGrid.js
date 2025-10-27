import React from "react";
import { useEffect } from "react";
import NewsCard from "./NewsCard";
import { useNews } from "../context/NewsContext";

function NewsGrid({ viewType = 'list' }) {
  const { state, dispatch } = useNews();
  const { articles, loading, currentPage, removedIds, itemsPerPage } = state;

  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  const defaultImage = "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg";

  useEffect(() => {
    setTimeout(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          const formattedata = data.slice(0, 18).map((item) => ({
            id: item.id,
            title: item.title,
            body: item.body,
            image: defaultImage,
            date: new Date(Date.now() - Math.random() * 10000000000).toUTCString().slice(0, 16) + " GMT",
          }));

          dispatch({ type: 'SET_ARTICLES', payload: formattedata });
          dispatch({ type: 'SET_LOADING', payload: false });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 5000);
  }, []);

  const handleClose = (id) => {
    dispatch({ type: 'REMOVE_ARTICLE', payload: id });
  };

  const availableArticles = articles.filter(article => !removedIds.includes(article.id));

  const totalPages = Math.max(1, Math.ceil(availableArticles.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  let currentArticles = availableArticles.slice(indexOfFirstItem, indexOfLastItem);
  
  if (currentArticles.length < itemsPerPage && availableArticles.length > indexOfLastItem) {
    const remainingNeeded = itemsPerPage - currentArticles.length;
    const additionalArticles = availableArticles.slice(indexOfLastItem, indexOfLastItem + remainingNeeded);
    currentArticles = [...currentArticles, ...additionalArticles];
  }

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  if (loading) {
    return (
      <div style={{ 
        fontSize: "24px", 
        padding: "50px", 
        textAlign: "center",
        background: "#dfe5e7ff",
        width: "100%",
        height: "130vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ width: "100%", background: "#dfe5e7ff", margin: "auto",}}>
      <div
        style={{
          display: viewType === 'grid' ? 'grid' : 'flex',
          gridTemplateColumns: viewType === 'grid' ? 'repeat(3, 1fr)' : 'none',
          flexDirection: viewType === 'list' ? 'column' : 'row',
          flexWrap: viewType === 'grid' ? 'wrap' : 'nowrap',
          gap: "20px",
          padding: "30px",
          justifyContent: "flex-start"
        }}
      >
        {currentArticles.map((a) => {
          return (
            <NewsCard 
              key={a.id}
              id={a.id}
              title={a.title} 
              body={a.body} 
              image={a.image}  
              date={a.date}
              onClose={handleClose}
              viewType={viewType}
            />
          );
        })}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "30px",
        background: "#dfe5e7ff"
      }}>
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "white",
              color: "#333",
              cursor: "pointer",
              fontSize: "18px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            «
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: currentPage === page ? "#ddd" : "white",
              color: "#333",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "white",
              color: "#333",
              cursor: "pointer",
              fontSize: "18px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            »
          </button>
        )}
      </div>
    </div>
  );
}

export default NewsGrid;
