import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

// GET - useQuery

// POST - useMutation
// PUT - useMutation
// DELETE - useMutation

const Blog = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: () => api.get("/blog"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const postMutation = useMutation({
    mutationFn: (body) => api.post("/blog", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    postMutation.mutate(body, {
      onSuccess: () => {
        e.target.reset();
      },
    });
  };

  return (
    <div>
      <h2>Blog</h2>
      <form onSubmit={handleSubmit} action="">
        <input name="title" type="text" />
        <input name="view" type="number" />
        <button>submit</button>
      </form>
      <div>
        {data?.data?.map((blog) => (
          <div key={blog.id}>
            <img src={blog.images} width={300} alt="" />
            <h3>{blog.title}</h3>
            <p>{blog.view} marta</p>
            <button onClick={() => handleDelete(blog.id)}>delete</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
