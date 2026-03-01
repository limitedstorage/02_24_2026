import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function FollowersList({ followersUrl }) {
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setFollowers([]);
    setError("");

    fetch(`${followersUrl}?per_page=12`) // Limited to 12 for a cleaner grid
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoading(false);
          setFollowers(data);
        },
        (error) => {
          setIsLoading(false);
          setError(error.message);
        },
      );
  }, [followersUrl]);

  return (
    <div className="mt-4">
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {followers.map((follower) => {
          return (
            <a 
              href={follower.html_url}
              target="_blank"
              rel="noreferrer"
              key={follower.id} 
              className="group relative flex flex-col items-center"
            >
              <img 
                src={follower.avatar_url} 
                alt={`${follower.login}'s avatar`} 
                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-blue-500 transition-all shadow-sm"
              />
              
              {/* Tooltip on hover */}
              <span className="absolute -top-8 scale-0 group-hover:scale-100 transition-all bg-gray-900 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap z-10">
                {follower.login}
              </span>
            </a>
          );
        })}
      </div>
      
      {followers.length === 0 && !isLoading && (
        <p className="text-gray-400 text-sm italic">No followers found.</p>
      )}
    </div>
  );
}

FollowersList.propTypes = {
  followersUrl: PropTypes.string.isRequired,
};