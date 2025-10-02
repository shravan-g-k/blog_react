import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../backend/database/db";
import Button from "../components/Button";
import Container from "../components/container/Container";

import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = React.useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      dbService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    const deleted = await dbService.deletePost(post.$id);
    if (deleted) {
      appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            className="rounded-xl"
            src={dbService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">edit</Button>
              </Link>
              <Button onClick={deletePost} bgColor="bg-red-500">delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold"> {post.title}</h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
