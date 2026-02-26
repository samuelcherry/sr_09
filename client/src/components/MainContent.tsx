const dummyData = [
  {
    userId: 0,
    postId: 0,
    username: "WhiteTomBrady",
    content: "They call me White Tom Brady",
    created_at: 0,
  },
];

const MainContent = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        {dummyData.map((post) => (
          <div className="bg-gray-400 p-2 m-2 rounded-lg" key={post.postId}>
            <p className="font-bold">{post.username}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainContent;
