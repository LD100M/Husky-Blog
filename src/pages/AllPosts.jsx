import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import Container from '../components/container/Container';
import PostCard from '../components/PostCard'
import NoPostWarning from '../components/noPostWarning';
import PostLoading from '../components/PostLoading';

function AllPosts() {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await appwriteService.getPosts([]);
        if (fetchedPosts && Array.isArray(fetchedPosts.documents)) { 
          setPosts(fetchedPosts.documents); 
        } else {
          setPosts([]); 
        }
      } catch (error) {
        console.log("Fetch failed", error);
        setPosts([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); 
  }, []); 

  if (loading) {
    return <PostLoading />; 
  }

  return (
    <div className='w-full py-8'>
      <Container>
        {posts.length === 0 ? (
          <NoPostWarning /> 
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;