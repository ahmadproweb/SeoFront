import { toast } from "react-toastify";


export const fetchBuySellList = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/buySellList/all`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok. Status: ${response.status}, Message: ${errorText}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching buy/sell list:", error);
    return [];
  }
};



// accountActions.js

export const handleView = async (accountId, viewedAccounts, setViewedAccounts, navigate) => {
  if (!viewedAccounts.has(accountId)) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      console.error("User not found in local storage.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/buySellList/accounts/increment-view`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, accountId }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setViewedAccounts(new Set(viewedAccounts).add(accountId));
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  }

  navigate(`/BuySell/${accountId}`);
};

export const handleReport = async (accountId, localServices, setLocalServices) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    console.error("User not found in local storage.");
    return;
  }

  // Find the service to check if it has already been reported
  const service = localServices.find((service) => service.accountId === accountId);

  if (service.reportAccount > 0) {
    toast.error("This account has already been reported.");
    return; // Prevent further execution
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/buySellList/accounts/report-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, accountId }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      toast.success("Report submitted successfully!");

      // Update the report count locally
      setLocalServices((prevServices) =>
        prevServices.map((service) =>
          service.accountId === accountId
            ? { ...service, reportAccount: service.reportAccount + 1 }
            : service
        )
      );
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.error("Error reporting account:", error);
  }
};
