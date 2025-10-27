import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import FeedbackModal from "./FeedbackModal";

function Sidebar({ onViewChange }) {
  const [viewType, setViewType] = useState('list');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleViewChange = (type) => {
    setViewType(type);
    if (onViewChange) {
      onViewChange(type);
    }
  };

  return (
    <div
      style={{
        background: "#dfe5e7ff",
        padding: "40px 20px",
        height: "115vh",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}
    >
      <div style={{ 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: "15px", 
        backgroundColor: "white", 
        padding: "15px", 
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}> 
        <Avatar 
          alt="Reader" 
          sx={{ width: 48, height: 48 }}
        >
          R
        </Avatar>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "#333" }}>Hi Reader,</h3>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>Here's your News!</p>
        </div>
      </div>

      <div style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h4 style={{ margin: "0 0 15px 0", fontSize: "14px", fontWeight: "bold", color: "#333" }}>View Toggle</h4>
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={() => handleViewChange('list')}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: viewType === 'list' ? '#50c878' : '#e0e0e0',
                color: viewType === 'list' ? 'white' : '#666',
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                fontSize: "16px",
                fontWeight: "500"
              }}
            >
              ☰ 
            </button>
            <button
              onClick={() => handleViewChange('grid')}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: viewType === 'grid' ? '#50c878' : '#e0e0e0',
                color: viewType === 'grid' ? 'white' : '#666',
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                fontSize: "16px",
                fontWeight: "500"
              }}
            >
              ▦ 
            </button>
          </div>
      </div>

      <div style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h4 style={{ margin: "0 0 15px 0", fontSize: "14px", fontWeight: "bold", color: "#333" }}>Have a Feedback?</h4>
        <button
          onClick={() => setIsFeedbackModalOpen(true)}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#50c878",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          We're Listening!
        </button>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </div>
  );
}

export default Sidebar;