import axios from "axios";
import React, { useEffect, useState } from "react";
import "./loading.css";

const Loading = () => {
   const [quote, setQuote] = useState("");
   useEffect(() => {
      (async () => {
         setQuote("Soul, Fight cancer with us");
      })();
      setTimeout(() => {
         setQuote(q => {
            if (q) return q;
            return "Please wait a mintue ";
         });
      }, 3000);
   }, []);
   return (
      <section className="loading">
         <div className="loading__circle"></div>
         <h2>Together we are tougher than cancer</h2>
         <p>{quote}</p>
      </section>
   );
};

export default Loading;
