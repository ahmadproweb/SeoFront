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


export const handleAccountReport = async (accountId, localServices, setLocalServices) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
        console.error("User not found in local storage.");
        return;
    }

    const service = localServices.find((service) => service.accountId === accountId);

    // Check if the account is locked
    if (service && service.isLocked) {
        toast.error("This account is currently locked and cannot be reported.");
        return; // Prevent further execution if locked
    }

    // Check if the user has already reported this account
    const existingReport = await fetch(
        `${import.meta.env.VITE_BASE_URL}/buySellList/accounts/check-report`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ userId: user.id, accountId }),
        }
    );

    const reportResult = await existingReport.json();
    
    if (reportResult.alreadyReported) {
        toast.error("You have already reported this account.");
        return; // Prevent further execution if already reported
    }

    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/buySellList/accounts/report-account`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ userId: user.id, accountId }),
            }
        );

        const result = await response.json();

        if (response.ok) {
            toast.success("Report submitted successfully!");
            // Update the report count locally
            setLocalServices(prevServices =>
                prevServices.map(service =>
                    service.accountId === accountId
                        ? { ...service, reportAccount: (service.reportAccount || 0) + 1 }
                        : service
                )
            );
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        console.error("Error reporting account:", error);
        toast.error("An error occurred while reporting the account.");
    }
};






export const lockAccount = async (accountId , userEmail , setLocalServices ) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/buySellList/lock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ accountId, userEmail }),
  });

  const result = await response.json();
  if (result.message === "Account locked successfully") {
    setLocalServices(prevServices => 
      prevServices.map(service => 
        service.accountId === accountId ? { ...service, isLocked: true } : service
      )
    );

    // Save to localStorage
    const storedLocks = JSON.parse(localStorage.getItem('lockedAccounts')) || {};
    storedLocks[accountId] = true;
    localStorage.setItem('lockedAccounts', JSON.stringify(storedLocks));
  } else {
    toast.error(result.message);
  }
};

export const unlockAccount = async (accountId, userEmail , setLocalServices) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/buySellList/unlock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ accountId, userEmail }), // Now userEmail is available here
  });

  const result = await response.json();
  if (result.message === "Account unlocked successfully") {
    setLocalServices(prevServices => 
      prevServices.map(service => 
        service.accountId === accountId ? { ...service, isLocked: false } : service
      )
    );

    // Save to localStorage
    const storedLocks = JSON.parse(localStorage.getItem('lockedAccounts')) || {};
    storedLocks[accountId] = false;
    localStorage.setItem('lockedAccounts', JSON.stringify(storedLocks));
  } else {
    toast.error(result.message);
  }
};
