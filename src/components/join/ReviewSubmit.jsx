// src/components/join/ReviewSubmit.jsx
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ReviewSubmit({ onSubmit }) {
  const { getValues, register } = useFormContext();
  const data = getValues();
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <section className="step review-step">
      <h2>  </h2>
      {/* Completed circle */}
      <div className="completion">
        <div className="circle">
          <span className="checkmark">&#10003;</span>
        </div>
        <h3>Completed!</h3>
        <p>Thank you for submitting your application. We're excited to have you onboard!</p>
      </div>

      {/* Comment textarea */}
      <label className="field">
        <span>Leave a comment (optional):</span>
        <textarea
          placeholder="Your comments..."
          {...register("comments")}
          value={comment}
          onChange={handleCommentChange}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
      </label>
      {/* Styles */}
      <style jsx>{`
        .completion {
          text-align: center;
          margin: 30px 0;
        }
        .circle {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background-color: #4caf50;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px auto;
        }
        .checkmark {
          color: white;
          font-size: 150px;
        }
        .completion h3 {
          font-size: 50px;
          margin: 20px 0 ;
          color: #4caf50;
        }
        .completion p {
          font-size: 1rem;
          color: #333;
        }
        .field textarea {
          
          min-height: 80px;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          resize: none;
          font-family: inherit;
          margin-top: 5px;
        }
        .btn.primary {
          background-color: #00629b;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          margin-top: 15px;
        }
        .btn.primary:hover {
          background-color: #004d7a;
        }
      `}</style>
    </section>
  );
}
