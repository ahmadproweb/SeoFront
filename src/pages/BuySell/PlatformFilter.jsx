import React from "react";

const platforms = ["google & blog", "social media", "gaming", "tech & it", "theme & plugins"];

function PlatformFilter({
  selectedPlatform,
  setSelectedPlatform,
  platformCounts,
  otherAccountsCount,
  allAccountsCount,
}) {
  return (
    <div className="buttonServices">
      <button type="button" onClick={() => setSelectedPlatform([])}>
        <span>{allAccountsCount}</span>
        All Accounts
      </button>
      {platforms.map((platform) => (
        <button
          key={platform}
          type="button"
          onClick={() => setSelectedPlatform([platform])} // Set as an array
        >
          <span>{platformCounts[platform.toLowerCase()] || 0}</span>
          {platform}
        </button>
      ))}
      <button type="button" onClick={() => setSelectedPlatform(["Other Accounts"])}>
        <span>{otherAccountsCount}</span>
        Other Accounts
      </button>
    </div>
  );
}

export default PlatformFilter;
