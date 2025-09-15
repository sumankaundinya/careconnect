import { API_ROUTES } from "@/utils/api";

import { createContext, useContext, useState } from "react";

const AddressContext = createContext(null);

export const AddressProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState(null);
  const createAddress = async (address) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_ROUTES.ADDRESS}/add-address`, {
        credentials: true,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(address),
      });
      if (!response.ok) {
        throw new Error("Response Error");
      }
      const data = await response.json();
      setAddress(data.address);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error || "Unable to Add Address");
    }
  };
  const fetchAddress = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_ROUTES.ADDRESS}/get-address`, {
        credentials: true,
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response Error");
      }
      const data = await response.json();
      setAddress(data.addresses);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error || "Unable to Add Address");
    }
  };
  const values = {
    isLoading,
    setIsLoading,
    error,
    setError,
    createAddress,
    fetchAddress,
  };
  return (
    <AddressContext.Provider value={values}>{children}</AddressContext.Provider>
  );
};
export const useAddressContext = () => useContext(AddressContext);
