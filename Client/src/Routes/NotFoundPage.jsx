import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#120013ff]">
      <div className="h-screen">
        <img
          className="h-screen object-cover object-center rounded"
          alt="hero"
          src={new URL(`../assets/notfound.gif`, import.meta.url)}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
