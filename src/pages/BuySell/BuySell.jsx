import React, { useEffect, useState } from "react";
import "../../css/buy&&sell.css";
import { fetchBuySellList } from "./fetch";
import SearchForm from "./searchFrom";
import PlatformFilter from "./PlatformFilter";
import AccountList from "./AccountList";
import { GiHamburgerMenu } from "react-icons/gi";

function BuySell() {
  const [services, setServices] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [search, setSearch] = useState("");
  const [allAccountsCount, setAllAccountsCount] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [platformCounts, setPlatformCounts] = useState({});
  const [otherAccountsCount, setOtherAccountsCount] = useState(0);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [selectedPageViews, setSelectedPageViews] = useState([]); // Ne
  const [loading, setLoading] = useState(true); // New loading state

  // Filter states
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSiteAges, setSelectedSiteAges] = useState([]);
  const [selectedMonthlyProfits, setSelectedMonthlyProfits] = useState([]);
  const [selectedProfitMargins, setSelectedProfitMargins] = useState([]);
  const [monetizationEnabled, setMonetizationEnabled] = useState({
    yes: false,
    no: false,
  });
  const handleMonetizationChange = (value) => {
    setMonetizationEnabled((prev) => ({
      yes: value === "yes",
      no: value === "no",
    }));
  };

  const toggleNavbar = () => {
    setNavbarVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchBuySellList();
        setServices(data);
        const counts = {};
        data.forEach((service) => {
          const platformLowerCase = service.accountType.toLowerCase();
          counts[platformLowerCase] = (counts[platformLowerCase] || 0) + 1;
        });
        setPlatformCounts(counts);
        const total = data.length;
        setTotalAccounts(total);
        const otherCount = data.reduce((count, service) => {
          const platformLowerCase = service.accountType.toLowerCase();
          const excludedPlatforms = [
            "google & blog",
            "social media",
            "gaming",
            "tech & it",
            "theme & plugins",
          ];
          if (!excludedPlatforms.includes(platformLowerCase)) {
            return count + 1;
          }
          return count;
        }, 0);
        setOtherAccountsCount(otherCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched or error occurs
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    setAllAccountsCount(totalAccounts);
  }, [totalAccounts]);

  const ageMatches = (serviceAge, ageRange) => {
    const ageValue = parseInt(serviceAge);
    const ageUnit = serviceAge.slice(-1); // last character

    let ageInWeeks;

    if (ageUnit === "d") {
      ageInWeeks = ageValue / 7; // Convert days to weeks
    } else if (ageUnit === "w") {
      ageInWeeks = ageValue; // Already in weeks
    } else if (ageUnit === "m") {
      ageInWeeks = ageValue * 4.345; // Approximate weeks in a month
    } else if (ageUnit === "y") {
      ageInWeeks = ageValue * 52.143; // Approximate weeks in a year
    } else {
      return false; // Return false if the format is not recognized
    }

    const [min, max] = ageRange.split(" - ").map((item) => {
      let unit = item.slice(-1);
      let value = parseInt(item);

      if (unit === "d") {
        return value / 7; // Convert days to weeks
      } else if (unit === "w") {
        return value; // Weeks stay the same
      } else if (unit === "m") {
        return value * 4.345; // Approximate weeks in a month
      } else if (unit === "y") {
        return value * 52.143; // Approximate weeks in a year
      }
      return 0;
    });

    return ageInWeeks >= min && ageInWeeks <= max;
  };

  const filteredServices = services.filter((service) => {
    const platformLowerCase = service.accountType.toLowerCase();
    const excludedPlatforms = [
      "google & blog",
      "social media",
      "gaming",
      "tech & it",
      "theme & plugins",
    ];

    const matchesPlatformFilter =
      selectedPlatforms.length === 0 ||
      (selectedPlatforms.includes("Other Accounts")
        ? !excludedPlatforms.includes(platformLowerCase) // Exclude predefined platforms for "Other Accounts"
        : selectedPlatforms.includes(platformLowerCase));

    const nameMatches =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.some((platform) => {
        return service.accountName
          .toLowerCase()
          .includes(platform.toLowerCase());
      });

    const priceRangeMatches =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const [min, max] = range.split(" - ").map(Number);
        return service.accountPrice >= min && service.accountPrice <= max;
      });

    const siteAgeMatches =
      selectedSiteAges.length === 0 ||
      selectedSiteAges.some((ageRange) =>
        ageMatches(service.siteAge, ageRange)
      );

    const monthlyProfitMatches =
      selectedMonthlyProfits.length === 0 ||
      selectedMonthlyProfits.some((profitRange) => {
        const [min, max] = profitRange.split(" - ").map(Number);
        return (
          Number(service.MonthlyProfit) >= min &&
          Number(service.MonthlyProfit) <= max
        );
      });

    const profitMarginMatches =
      selectedProfitMargins.length === 0 ||
      selectedProfitMargins.some((marginRange) => {
        const [min, max] = marginRange
          .split(" - ")
          .map((item) => Number(item.replace("%", "").trim()));
        return (
          Number(service.ProfitMargin) >= min &&
          Number(service.ProfitMargin) <= max
        );
      });

    const matchesSearch =
      search === "" ||
      service.accountName.toLowerCase().includes(search.toLowerCase()) ||
      service.accountType.toLowerCase().includes(search.toLowerCase()) ||
      service.sellerDetails.SellerEmail.toLowerCase().includes(
        search.toLowerCase()
      ) ||
      service.sellerDetails.SellerFullName.toLowerCase().includes(
        search.toLowerCase()
      ) ||
      service.accountPrice.toString().includes(search) ||
      service.accountId.toString().includes(search);
    const monetizationMatches =
      (!monetizationEnabled.yes && !monetizationEnabled.no) ||
      (monetizationEnabled.yes && service.monetizationEnabled === "Yes") ||
      (monetizationEnabled.no && service.monetizationEnabled === "No");

    const pageViewMatches =
      selectedPageViews.length === 0 ||
      selectedPageViews.some((range) => {
        const [min, max] = range.split(" - ").map(Number);
        console.log(
          `Checking Page Views: ${service.PageViews} against range: ${range}`
        );
        return service.PageViews >= min && service.PageViews <= max;
      });

    console.log(
      `Page View Match for ${service.accountName}: ${pageViewMatches}`
    );

    return (
      (matchesPlatformFilter || nameMatches) &&
      priceRangeMatches &&
      siteAgeMatches &&
      monthlyProfitMatches &&
      profitMarginMatches &&
      matchesSearch &&
      monetizationMatches &&
      pageViewMatches
    );
  });

  const handlePageViewChange = (range) => {
    setSelectedPageViews((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleCheckboxChange = (platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleSiteAgeChange = (range) => {
    setSelectedSiteAges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleMonthlyProfitChange = (range) => {
    setSelectedMonthlyProfits((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleProfitMarginChange = (range) => {
    setSelectedProfitMargins((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const clearFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedSiteAges([]);
    setSelectedMonthlyProfits([]);
    setSelectedProfitMargins([]);
    setSelectedPlatforms([]);
    setMonetizationEnabled([]);
  };

  return (
    <div className="servicesAll">
      <div className="sell1">
        <SearchForm search={search} setSearch={setSearch} />
        <a href="/accountSell">Account Sell</a>
      </div>
      <PlatformFilter
        selectedPlatform={selectedPlatforms}
        setSelectedPlatform={setSelectedPlatforms}
        platformCounts={platformCounts}
        otherAccountsCount={otherAccountsCount}
        allAccountsCount={allAccountsCount}
      />
      <div className="main-container">
        <GiHamburgerMenu className="hamburger1" onClick={toggleNavbar} />
        <div className={`left-navbar ${isNavbarVisible ? "visible" : ""}`}>
          {/* Account Name Filter */}
          <div className="categories">
            <h1>Account Name</h1>
            {["instagram", "tik tok", "social", "facebook"].map((platform) => (
              <label key={platform}>
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => handleCheckboxChange(platform)}
                />
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </label>
            ))}
          </div>

          {/* Account Price Filter */}
          <div className="categories">
            <h1>Account Price</h1>
            {[
              "500 - 1000",
              "1000 - 5000",
              "5000 - 10000",
              "10000 - 20000",
              "20000 - 50000",
              "50000 - 100000",
            ].map((range) => (
              <label key={range}>
                {`${range}`}
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range)}
                  onChange={() => handlePriceRangeChange(range)}
                />
              </label>
            ))}
          </div>

          {/* Site Age Filter */}
          <div className="categories">
            <h1>Site Age</h1>
            {["1d - 7d", "1w - 1m", "1m - 6m", "6m - 1y", "1y - 2y"].map(
              (range) => (
                <label key={range}>
                  {range}
                  <input
                    type="checkbox"
                    checked={selectedSiteAges.includes(range)}
                    onChange={() => handleSiteAgeChange(range)}
                  />
                </label>
              )
            )}
          </div>

          {/* Monthly Profit Filter */}
          <div className="categories">
            <h1>Monthly Profit</h1>
            {[
              "0 - 100",
              "100 - 500",
              "500 - 1000",
              "1000 - 5000",
              "5000 - 10000",
            ].map((range) => (
              <label key={range}>
                {range}
                <input
                  type="checkbox"
                  checked={selectedMonthlyProfits.includes(range)}
                  onChange={() => handleMonthlyProfitChange(range)}
                />
              </label>
            ))}
          </div>

          {/* Profit Margin Filter */}
          <div className="categories">
            <h1>Profit Margin</h1>
            {[
              "0% - 10%",
              "10% - 25%",
              "25% - 50%",
              "50% - 75%",
              "75% - 100%",
            ].map((range) => (
              <label key={range}>
                {range}
                <input
                  type="checkbox"
                  checked={selectedProfitMargins.includes(range)}
                  onChange={() => handleProfitMarginChange(range)}
                />
              </label>
            ))}
          </div>

          <div className="categories">
            <h1>Page Views</h1>
            {[
              "0 - 100",
              "100 - 500",
              "500 - 1000",
              "1000 - 5000",
              "5000 - 10000",
            ].map((range) => (
              <label key={range}>
                {range}
                <input
                  type="checkbox"
                  checked={selectedPageViews.includes(range)}
                  onChange={() => handlePageViewChange(range)}
                />
              </label>
            ))}
          </div>

          <div className="categories">
            <h1>Monetization Enabled</h1>
            <label>
              Yes
              <input
                type="checkbox"
                checked={monetizationEnabled.yes}
                onChange={() => handleMonetizationChange("yes")}
              />
            </label>
            <label>
              No
              <input
                type="checkbox"
                checked={monetizationEnabled.no}
                onChange={() => handleMonetizationChange("no")}
              />
            </label>
          </div>

          <button onClick={clearFilters}>Clear Filters</button>
        </div>
        <hr />
        {loading ? (
          <div className="loadingInam">Loading...</div>
        ) : (
          <AccountList services={filteredServices} />
        )}
      </div>
    </div>
  );
}

export default BuySell;
