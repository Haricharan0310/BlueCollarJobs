import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function CreatePost() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        // User not signed in, handle accordingly
        alert("Please sign in to create a job post.");
        return;
      }

      await addDoc(collection(db, "posts"), {
        title: jobTitle,
        description: jobDescription,
        email: user.email, // Add the user's email to the post
        username: user.displayName, // Add the user's display name (username) to the post
      });
      setJobTitle("");
      setJobDescription("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post" align="center">
      <h2>Create a New Job Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default CreatePost;
