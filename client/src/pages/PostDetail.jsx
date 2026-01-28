import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get('/posts').then(res => {
            const found = res.data.find(p => p._id === id);
            setPost(found);
        });
    }, [id]);

    if (!post) return <div className="text-center mt-10">Cargando...</div>;

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <Link to="/blog" className="text-blue-500 mb-4 inline-block">← Volver</Link>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-500 mb-8 text-sm">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span> • 
                <span className="ml-2 bg-gray-200 px-2 py-1 rounded">{post.category}</span>
            </div>
            <div className="prose lg:prose-xl text-gray-800 whitespace-pre-wrap">
                {post.content}
            </div>
        </div>
    );
};
export default PostDetail;