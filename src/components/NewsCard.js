import React from "react";

function NewsCard({ id, title, body, image, date, onClose, viewType = 'grid' }) {
  const truncatetitle =
    title && title.length > 50 ? title.substring(0, 50) + "..." : title;
  const truncatebody = body && body.length > 120 ? body.substring(0, 100) + "..." : body;

  if (viewType === 'list') {
    return (
      <div
        style={{
          position: "relative",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          padding: "15px",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          alignItems: "flex-start"
        }}
      >
        <button
          onClick={() => onClose && onClose(id)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            color: "#ff4444",
            cursor: "pointer",
            width: "30px",
            height: "30px",
            display: "flex",
            zIndex: 1
          }}
        >
          ✕
        </button>

        <img
          src={image}
          alt={title}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0
          }}
        />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          <h3 style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            lineHeight: "1.4"
          }}>
            {truncatetitle}
          </h3>
          
          <p style={{
            margin: 0,
            fontSize: "14px",
            color: "#666",
            lineHeight: "1.4"
          }}>
            {truncatebody}
          </p>
          
          <p style={{
            margin: 0,
            fontSize: "12px",
            color: "#999"
          }}>
            {date}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        padding: "15px",
        width: "300px",
        boxSizing: "border-box",
        height: "350px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <button
        onClick={() => onClose && onClose(id)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "24px",
          color: "#ff4444",
          cursor: "pointer",
          width: "30px",
          height: "30px",
          display: "flex",
          zIndex: 1
        }}
      >
        ✕
      </button>
      
      <h3 style={{
        margin: "20px 0 10px 0",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
        lineHeight: "1.3"
      }}>
        {truncatetitle}
      </h3>
      
      <p style={{
        margin: "0 0 10px 0",
        fontSize: "14px",
        color: "#666",
        lineHeight: "1.5"
      }}>
        {truncatebody}
      </p>
      
      <p style={{
        margin: "0 0 10px 0",
        fontSize: "12px",
        color: "#999"
      }}>
        {date}
      </p>
      
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "4px",
          marginTop: "0px"
        }}
      />
    </div>
  );
}

export default NewsCard;