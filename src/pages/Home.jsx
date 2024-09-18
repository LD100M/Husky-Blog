import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from "../appwrite/config";
import Container from '../components/container/Container';
import PostCard from "../components/PostCard";
import LoginWarning from '../components/loginWarning';
import NoPostWarning from '../components/noPostWarning';
import PostLoading from '../components/PostLoading';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const loginStatus = useSelector((state) => state.auth.status);

  // Home page displays all the posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await appwriteService.getPosts([]);
        if (posts) {
          setPosts(posts.documents);
        }
      } catch (error) {
        console.log("fetch fails");
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchPosts();
  }, []);

  if (!loginStatus) {
    return <LoginWarning />;
  }

  if (loading) {
    return <PostLoading />
  }

  if (!loading && posts.length === 0) {
    return <NoPostWarning />;
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
