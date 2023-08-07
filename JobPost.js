import React from "react";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";

function JobPost({ post }) {
  const handleApply = async () => {
    const user = auth.currentUser;
    if (!user) {
      // User not signed in, handle accordingly
      alert("Please sign in to apply for the job.");
      return;
    }

    // Add your code to apply for the job here
    // You can use post.email and post.username for the user's email and username

    alert("Applied successfully!");
  };

  return (
    <div className="job-post">
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <p>Posted by: {post.username}</p>
      <button onClick={handleApply}>Apply</button>
      <button>See applicants</button>
    </div>
  );
}

export default JobPost;
