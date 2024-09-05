import React, { useEffect, useState } from "react";
import "../../css/buy&&sell.css";
import { fetchBuySellList } from "./fetch";
import SearchForm from "./searchFrom";
import PlatformFilter from "./PlatformFilter";
import AccountList from "./AccountList";

function BuySell() {
  const [services, setServices] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("All Account");
  const [search, setSearch] = useState("");
  const [allAccountsCount, setAllAccountsCount] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [platformCounts, setPlatformCounts] = useState({});
  const [otherAccountsCount, setOtherAccountsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    setAllAccountsCount(totalAccounts);
  }, [totalAccounts]);

  const filteredServices = services.filter((service) => {
    const platformLowerCase = service.accountType.toLowerCase();

    if (selectedPlatform === "All Account") {
      return platformLowerCase.includes(search.toLowerCase());
    } else if (selectedPlatform === "Other Accounts") {
      const excludedPlatforms = [
        "google & blog",
        "social media",
        "gaming",
        "tech & it",
        "theme & plugins",
      ];
      return (
        !excludedPlatforms.includes(platformLowerCase) &&
        platformLowerCase.includes(search.toLowerCase())
      );
    } else {
      return (
        platformLowerCase === selectedPlatform.toLowerCase() &&
        platformLowerCase.includes(search.toLowerCase())
      );
    }
  });

  return (
    <div className="servicesAll">
      <div className="sell1">
        <SearchForm search={search} setSearch={setSearch} />
        <a href="/accountSell">account sell</a>
      </div>
      <PlatformFilter
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        platformCounts={platformCounts}
        otherAccountsCount={otherAccountsCount}
        allAccountsCount={allAccountsCount}
      />
      <AccountList services={filteredServices} />
    </div>
  );
}

export default BuySell;
