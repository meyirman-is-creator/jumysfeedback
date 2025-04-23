// src/hooks/useCompanyDetails.ts
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  fetchCompanyOverview,
  fetchCompanyTaxes,
  fetchCompanyStocks,
  selectCompanyOverview,
  selectCompanyTaxes,
  selectCompanyStocks,
  selectCompanyLoadingState,
  selectCompanyErrorState,
  clearCompanyDetails,
} from "@/features/companyDetails/companyDetailsSlice";
import { useCallback } from "react";

export const useCompanyDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const overview = useSelector(selectCompanyOverview);
  const taxes = useSelector(selectCompanyTaxes);
  const stocks = useSelector(selectCompanyStocks);
  const loading = useSelector(selectCompanyLoadingState);
  const error = useSelector(selectCompanyErrorState);

  const fetchOverview = useCallback(
    (companyId: string) => {
      return dispatch(fetchCompanyOverview(companyId));
    },
    [dispatch]
  );

  const fetchTaxes = useCallback(
    (companyId: string) => {
      return dispatch(fetchCompanyTaxes(companyId));
    },
    [dispatch]
  );

  const fetchStocks = useCallback(
    (companyId: string) => {
      return dispatch(fetchCompanyStocks(companyId));
    },
    [dispatch]
  );

  const clearDetails = useCallback(() => {
    dispatch(clearCompanyDetails());
  }, [dispatch]);

  return {
    overview,
    taxes,
    stocks,
    loading,
    error,
    fetchOverview,
    fetchTaxes,
    fetchStocks,
    clearDetails,
  };
};
