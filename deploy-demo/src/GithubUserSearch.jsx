import { useState } from "react";
import FollowersList from "./FollowersList";

export default function GithubUserSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [githubUser, setGithubUser] = useState(null);
  const [error, setError] = useState("");

  const searchForUser = (userName) => {
    setIsLoading(true);
    setGithubUser(null);
    setError("");

    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => {
        if (response.status === 404) throw Error("User not found");
        if (response.status !== 200) throw Error("An error occurred");
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
        }
      );
  };

  const onSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target[0].value;
    if (searchValue) searchForUser(searchValue);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Github Finder</h1>
          <p className="text-gray-500">Search for any developer to see their profile</p>
        </header>

        {/* Search Form */}
        <form onSubmit={onSearch} className="flex gap-2 mb-8">
          <input 
            type="text" 
            placeholder="Enter username (e.g. octocat)"
            className="flex-1 p-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button 
            type="submit"
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Status Messages */}
        {isLoading && (
          <div className="text-center py-10 italic text-gray-400 animate-pulse">Searching GitHub...</div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {/* Result Card */}
        {githubUser && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-6 mb-6">
                <img
                  className="w-24 h-24 rounded-2xl border-4 border-gray-50 shadow-sm object-cover"
                  src={githubUser.avatar_url}
                  alt={`${githubUser.name}'s avatar`}
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{githubUser.name || githubUser.login}</h2>
                  <a 
                    href={githubUser.html_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    @{githubUser.login}
                  </a>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{githubUser.bio}</p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-50 mb-6">
                <div className="text-center">
                  <span className="block text-xl font-bold text-gray-800">{githubUser.public_repos}</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Repos</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-bold text-gray-800">{githubUser.followers}</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Followers</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-bold text-gray-800">{githubUser.following}</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Following</span>
                </div>
              </div>

              {/* Followers List Component */}
              <div className="mt-6">
                <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Followers</h3>
                <FollowersList followersUrl={githubUser.followers_url} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}