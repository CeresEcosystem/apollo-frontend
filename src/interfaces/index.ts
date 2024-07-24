export interface SelectOption {
  label: string;
  value: string;
}

export interface TokenPrices {
  token: string;
  price: number;
  assetId: string;
}

export interface LendingAssetSelectOption {
  label: string;
  value: string;
  icon: string;
  apr: number;
}

export interface LendingRewardsSelectOption {
  label: string;
  value: string;
  icon: string;
  rewards: string;
}

export interface BorrowingAssetSelectOption {
  label: string;
  value: string;
  icon: string;
  loanToValue: number;
}

export interface AssetSelectOption {
  label: string;
  value: string;
  icon: string;
}

export interface ClaimableAccount {
  accountId: string;
  balance: number;
  hasClaimed: boolean;
}

export interface GovernancePoll {
  pollId: string;
  title: string;
  description: string;
  options: string[];
  dateFrom: number;
  dateTo: number;
  active?: number;
}

export interface GovernancePolls {
  active: GovernancePoll[];
  upcoming: GovernancePoll[];
  closed: GovernancePoll[];
}

export interface GovernancePollVote {
  accountId: string;
  votingOption: number;
  numberOfVotes: number;
  assetWithdrawn: boolean;
}

export interface GovernancePollDetails {
  pollId: string;
  title: string;
  description: string;
  options: string[];
  status: string;
  dateFrom: number;
  dateTo: number;
  voters: GovernancePollVote[];
}

interface GovernanceResult {
  sum: number;
  percentage: number;
  sumFormatted: string;
}

export interface GovernacePollResults {
  [option: string]: GovernanceResult;
}

export interface GovernancePollDetailsData {
  poll: GovernancePollDetails;
  results: GovernacePollResults;
}

export interface GovernanceSelectedAnswer {
  answer: string;
  index: number;
}

export interface LendingAssetFormData {
  asset: LendingAssetSelectOption | null;
  balance: number;
  inputValue: string;
  price: number;
}

export interface RepayCollateralFormData {
  balance: number;
  inputValue: string;
  price: number;
}

export interface LendingWithdrawFormData {
  inputValue: string;
  price: number;
}

export interface LendingRewardsFormData {
  asset: LendingRewardsSelectOption | null;
}

export interface BorrowingAssetFormData {
  asset: BorrowingAssetSelectOption | null;
  collateral: BorrowingAssetSelectOption | null;
  inputValue: string;
  price: number;
  ltv: number;
}

export interface BorrowMoreFormData {
  inputValue: string;
  price: number;
  ltv: number;
}

export interface AddCollateralFormData {
  inputValue: string;
  price: number;
}

export interface LendingInfo {
  poolAssetId: string;
  poolAssetSymbol: string;
  apr: number;
  amount: string;
  rewards: string;
  isRemoved: boolean;
}

export interface Collateral {
  collateralAssetId: string;
  collateralAssetSymbol: string;
  collateralAmount: string;
  borrowedAmount: string;
  interest: string;
  rewards: string;
}

export interface BorrowingInfo {
  poolAssetId: string;
  poolAssetSymbol: string;
  loanToValue: string;
  interestApr: number;
  rewardsApr: number;
  amount: string;
  interest: string;
  rewards: string;
  healthFactor: number;
  collaterals: Collateral[];
  totalCollateralsInUsd: string;
  isRemoved: boolean;
}

export interface StatsData {
  tvl: number;
  totalLent: number;
  totalBorrowed: number;
  totalUsers: number;
}

export interface UserData {
  tvl: string;
  totalLent: string;
  totalBorrowed: string;
  totalRewards: string;
}

export interface DashboardData {
  lendingInfo: LendingInfo[];
  borrowingInfo: BorrowingInfo[];
  userData: StatsData;
}

export interface MarketPool {
  poolAssetId: string;
  poolAssetSymbol: string;
  lent: number;
  borrowed: number;
  lendingAPR: number;
  borrowingAPR: number;
  isRemoved: boolean;
}

export interface MarketsData {
  pools: MarketPool[];
  stats: StatsData;
}

export interface LendingWithdrawModal {
  show: boolean;
  item: LendingInfo | null;
}

export interface TransactionOverviewData {
  label: string;
  info: string;
}

export interface BorrowingCollateralModal {
  show: boolean;
  asset: BorrowingInfo | null;
  collateral: Collateral | null;
}

export interface PageMeta {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface HistoryItem {
  blockNum: string;
  method: string;
  token: string;
  amount: number | null;
  collateralToken: string | null;
  collateralAmount: number | null;
  createdAt: string;
}

export interface HistoryData {
  data: HistoryItem[];
  meta: PageMeta;
}

export interface HistoryFilterData {
  dateFrom: Date | null;
  dateTo: Date | null;
  asset: SelectOption | '';
  action: SelectOption | '';
}

export enum FEE_TYPES {
  Lend = 'Lend',
  Borrow = 'Borrow',
  Rewards = 'Rewards',
  Withdraw = 'Withdraw',
  Repay = 'Repay',
}

export interface FeeDto {
  type: FEE_TYPES;
  fee: number;
}
