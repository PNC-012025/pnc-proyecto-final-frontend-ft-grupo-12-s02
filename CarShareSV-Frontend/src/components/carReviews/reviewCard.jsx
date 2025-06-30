import React from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex items-center mb-2">
        <span className="font-semibold mr-2">
          {review.reviewUsername}
        </span>
        <span className="text-primary flex">
          {Array.from({ length: review.rating }, (_, i) => (
            <FaStar key={i} />
          ))}
        </span>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
}