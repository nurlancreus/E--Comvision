// USER DATA
export interface UserType {
  city: string;
  country: string;
  createdAt: string;
  email: string;
  name: string;
  occupation: string;
  password: string;
  phoneNumber: string;
  role: string;
  state: null;
  transactions: Array<string>;
  updatedAt: string;
  __v: number;
  _id: string;
}

// PRODUCTS DATA
interface DailyDataType {
  date: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
}

interface MonthlyDataType {
  month: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
}

interface StatType {
  dailyData: Array<DailyDataType>;
  monthlyData: Array<MonthlyDataType>;
  productId: string;
  updatedAt: string;
  createdAt: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  __v: number;
  _id: string;
}

export interface ProductType {
  category: string;
  createdAt: string;
  description: string;
  name: string;
  price: number;
  rating: number;
  stat: Array<StatType>;
  supply: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

// TRANSACTION DATA
interface TransactionType {
  cost: string;
  createdAt: string;
  userId: string;
  products: Array<string>;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface TransactionDataType {
  total: number;
  transactions: Array<TransactionType>;
}

// GEOGRAPHY DATA
export interface GeographyType {
  id: string;
  value: number;
}

// SALES DATA
interface salesByCategoryType {
  accessories: number;
  clothing: number;
  misc: number;
  shoes: number;
}

export interface SalesType {
  createdAt: string;
  dailyData: Array<DailyDataType>;
  monthlyData: Array<MonthlyDataType>;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  totalCustomers: number;
  salesByCategory: salesByCategoryType;
  updatedAt: string;
  year: number;
  __v: number;
  _id: string;
}

export interface TotalDataLineType {
  id: string;
  color: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}

// ADMIN DATA
export type AdminType = Omit<UserType, "password">;

// AFFILIATE DATA
type AffiliateStatsType = {
  affiliateSales: Array<string>;
  createdAt: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
};

export interface UserPerformanceType {
  user: UserType & { affiliateSales: AffiliateStatsType };
  sales: Array<TransactionType>;
}

// DASHBOARD DATA
export interface DashboardDataType {
  monthlyData: Array<MonthlyDataType>;
  salesByCategory: salesByCategoryType;
  thisMonthStats: MonthlyDataType;
  todayStats: DailyDataType;
  totalCustomers: number;
  transactions: Array<TransactionType>;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
}
