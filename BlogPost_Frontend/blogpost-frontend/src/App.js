import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ViewBlogPosts from './BlogPostsHandlingComponenet/ViewBlogPosts';
import CreatePosts from './BlogPostsHandlingComponenet/CreatePost';
import UpdatePost from './BlogPostsHandlingComponenet/UpdatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewBlogPosts />} />
        <Route path="/createPost" element={<CreatePosts />} />
        <Route path="/updatePost/:id" element={<UpdatePost />} />

      </Routes>
    </Router>
  );
}

export default App;
