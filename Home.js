import React, { useEffect, useState } from "react";
import { getDocs, collection, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import Modal from "../../node_modules/@mui/material/Modal";
import "./About";



function Home() {
  const [postList, setPostList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPostList(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  const handleApply = async (postId) => {
    const user = auth.currentUser;
    if (!user) {
      // User not signed in, handle accordingly
      alert("Please sign in to apply for the job.");
      return;
    }
  
    try {
      // Test Firestore write directly
     /* const testDocRef = doc(db, "testCollection", "testDocument"); // Change "testCollection" and "testDocument" to match your Firestore structure
      await updateDoc(testDocRef, {
        applicants: arrayUnion({
          name: user.displayName,
          email: user.email,
        }),
      }); */
  
      // If the above write works, it means the Firestore write operation is working fine
  
      // Get the post document and add the application data
      const postDocRef = doc(db, "posts", postId);
      await updateDoc(postDocRef, {
        applicants: arrayUnion({
          name: user.displayName,
          email: user.email,
        }),
      });
      alert("Applied successfully!");
    } catch (error) {
      console.error("Error applying for the job:", error);
    }
  };

  const handleOpen = (event) => {
    setModalOpen(true);
    const currentPost = postList.filter(post => post.id === event.target.id);
    const tempApplicants = currentPost.length > 0 ? currentPost[0].applicants : [];
    setApplicants(tempApplicants);
    console.log(tempApplicants);
  }

  const handleClose = () => {
    setModalOpen(false);
    setApplicants([]);
  }
  
  return (
    <div className="homePage" >
      <h2>Job Posts</h2>
      {postList.map((post) => (
        <div className="postCard" key={post.id} >
          <div className="postHeader">
            <h3 className="title" >{post.title}</h3>
          </div>
          <div className="postTextContainer">
            <p>{post.description}</p>
            <p>Posted by: {post.username}</p>
          </div>
          <div className="buttonContainer">
          <button onClick={() => handleApply(post.id)}>Apply</button>
          <button id ={post.id} onClick= {handleOpen}>See applicants</button>
          </div>
          {modalOpen && (
            <Modal
            onClose={handleClose}
            open={modalOpen}
            style={{
                position: 'absolute',
                border: '2px solid #000',
                backgroundColor: 'rgb(10, 130, 163)' ,

                boxShadow: '2px solid black',
                height: 380,
                width: 240,
                margin: 'auto'
            }}
        >
            <div>
            <h4>Applicants:</h4>
            {applicants.length > 0 ? (
              <div>
                {applicants.map((applicant, index) => (
                  <div key={index}>
                    <p >{applicant.name}</p>
                    <p >{applicant.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No applicants yet.</p>
            )}
            <button onClick={handleClose}>Close</button>
          </div>
            
        </Modal>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
