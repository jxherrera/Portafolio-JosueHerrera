import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/posts');
            setPosts(res.data);
        };
        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Blog Técnico</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map(post => (
                    <div key={post._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
                        <span className="text-xs font-bold text-blue-500 uppercase">{post.category}</span>
                        <h2 className="text-xl font-bold mt-2">{post.title}</h2>
                        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{post.content.substring(0, 100)}...</p>
                        <Link to={`/blog/${post._id}`} className="block mt-4 text-blue-600 hover:underline">Leer más →</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Blog;