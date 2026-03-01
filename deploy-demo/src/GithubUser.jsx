import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GithubUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [githubUser, setGithubUser] = useState(null);
  const [error, setError] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setGithubUser(null);
    setError("");

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) throw new Error("User not found");
        return response.json();
      })
      .then(
        (data) => {
          setIsLoading(false);
          setGithubUser(data);
        },
        (error) => {
          setIsLoading(false);
          setError(error.message);
        },
      );
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Fetching profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 text-center bg-red-50 rounded-2xl border border-red-100">
        <h2 className="text-red-800 font-bold text-xl">Oops!</h2>
        <p className="text-red-600 mt-2">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {githubUser && (
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
          {/* Cover Accent */}
          <div className="h-32 bg-linear-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="px-8 pb-10">
            <div className="relative -top-12 flex flex-col md:flex-row md:items-end gap-6">
              <img
                className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg object-cover bg-white"
                src={githubUser.avatar_url}
                alt={`${githubUser.name}'s avatar`}
              />
              <div className="md:pb-2">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    {githubUser.name || githubUser.login}
                </h1>
                <p className="text-blue-600 font-semibold text-lg">@{githubUser.login}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              {/* Left Column: Bio and Links */}
              <div className="md:col-span-2">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {githubUser.bio || "This developer hasn't added a bio yet."}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {githubUser.location && (
                    <div className="flex items-center gap-1">
                      <span className="opacity-70">📍</span> {githubUser.location}
                    </div>
                  )}
                  {githubUser.blog && (
                    <a href={githubUser.blog} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline">
                      <span className="opacity-70">🔗</span> Website
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Mini Stats Card */}
              <div className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Public Repos</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    {githubUser.public_repos}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Followers</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    {githubUser.followers}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Following</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                    {githubUser.following}
                  </span>
                </div>
                
                <a 
                  href={githubUser.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-center py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}