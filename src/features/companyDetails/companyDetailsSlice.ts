// src/features/companyDetails/companyDetailsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/services/apiClient";
import { RootState } from "@/store";

// Types
export interface CompanyOverview {
  id: number;
  name: string;
  logoUrl: string;
  bannerImg: string;
  description: string;
  location: string;
  rating: number;
  size: string;
  industries: string[];
  founded: string;
  revenue: string;
  mission: string;
  topReview: {
    id: number;
    title: string;
    body: string;
    rating: number;
    author: string | null;
    date: string;
  } | null;
  totalReviews: number;
  topSalary: any | null;
  totalSalaries: number;
}

export interface CompanyTaxes {
  companyId: number;
  companyName: string;
  registrationDate: string;
  companyStatus: string;
  companyType: string;
  companySize: string;
  businessActivity: string;
  businessActivityCode: string;
  lastUpdateDate: string;
  dataSource: string;
  vatPayer: boolean;
  astanaHubParticipant: boolean;
  governmentProcurementParticipant: boolean;
  licenseCount: number;
  lastDocumentChangeDate: string;
  participationsInOtherCompanies: number;
  yearlyTaxes: {
    year: number;
    amount: number;
    formattedAmount: string;
    dataSource: string;
  }[];
  annualRevenue: number;
  annualRevenueFormatted: string;
}

export interface StockHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CompanyStocks {
  companyId: number;
  companyName: string;
  symbol: string;
  currentPrice: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  currency: string;
  priceChange: number;
  priceChangePercent: number;
  formattedPrice: string;
  formattedMarketCap: string;
  timestamp: string;
  historicalData: StockHistoricalData[];
}

interface CompanyDetailsState {
  overview: CompanyOverview | null;
  taxes: CompanyTaxes | null;
  stocks: CompanyStocks | null;
  reviews: any[] | null;
  salaries: any[] | null;
  loading: {
    overview: boolean;
    taxes: boolean;
    stocks: boolean;
    reviews: boolean;
    salaries: boolean;
  };
  error: {
    overview: string | null;
    taxes: string | null;
    stocks: string | null;
    reviews: string | null;
    salaries: string | null;
  };
}

const initialState: CompanyDetailsState = {
  overview: null,
  taxes: null,
  stocks: null,
  reviews: null,
  salaries: null,
  loading: {
    overview: false,
    taxes: false,
    stocks: false,
    reviews: false,
    salaries: false,
  },
  error: {
    overview: null,
    taxes: null,
    stocks: null,
    reviews: null,
    salaries: null,
  },
};

// Thunks
export const fetchCompanyOverview = createAsyncThunk(
  "companyDetails/fetchOverview",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/companies/${companyId}/overview`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch company overview"
      );
    }
  }
);

export const fetchCompanyTaxes = createAsyncThunk(
  "companyDetails/fetchTaxes",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/companies/${companyId}/taxes`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch company taxes"
      );
    }
  }
);

export const fetchCompanyStocks = createAsyncThunk(
  "companyDetails/fetchStocks",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/companies/${companyId}/stocks`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch company stocks"
      );
    }
  }
);

// Create slice
const companyDetailsSlice = createSlice({
  name: "companyDetails",
  initialState,
  reducers: {
    clearCompanyDetails: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Overview
    builder
      .addCase(fetchCompanyOverview.pending, (state) => {
        state.loading.overview = true;
        state.error.overview = null;
      })
      .addCase(fetchCompanyOverview.fulfilled, (state, action) => {
        state.loading.overview = false;
        state.overview = action.payload;
      })
      .addCase(fetchCompanyOverview.rejected, (state, action) => {
        state.loading.overview = false;
        state.error.overview = action.payload as string;
      });

    // Taxes
    builder
      .addCase(fetchCompanyTaxes.pending, (state) => {
        state.loading.taxes = true;
        state.error.taxes = null;
      })
      .addCase(fetchCompanyTaxes.fulfilled, (state, action) => {
        state.loading.taxes = false;
        state.taxes = action.payload;
      })
      .addCase(fetchCompanyTaxes.rejected, (state, action) => {
        state.loading.taxes = false;
        state.error.taxes = action.payload as string;
      });

    // Stocks
    builder
      .addCase(fetchCompanyStocks.pending, (state) => {
        state.loading.stocks = true;
        state.error.stocks = null;
      })
      .addCase(fetchCompanyStocks.fulfilled, (state, action) => {
        state.loading.stocks = false;
        state.stocks = action.payload;
      })
      .addCase(fetchCompanyStocks.rejected, (state, action) => {
        state.loading.stocks = false;
        state.error.stocks = action.payload as string;
      });
  },
});

// Actions
export const { clearCompanyDetails } = companyDetailsSlice.actions;

// Selectors
export const selectCompanyOverview = (state: RootState) =>
  state.companyDetails.overview;
export const selectCompanyTaxes = (state: RootState) =>
  state.companyDetails.taxes;
export const selectCompanyStocks = (state: RootState) =>
  state.companyDetails.stocks;
export const selectCompanyLoadingState = (state: RootState) =>
  state.companyDetails.loading;
export const selectCompanyErrorState = (state: RootState) =>
  state.companyDetails.error;

export default companyDetailsSlice.reducer;
