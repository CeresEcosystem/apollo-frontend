export interface LendingAssetSelectOption {
  label: string;
  value: string;
  icon: string;
  balance: number;
  apr: number;
}

export interface LendingRewardsSelectOption {
  label: string;
  value: string;
  icon: string;
  rewards: number;
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
}

export interface LendingRewardsFormData {
  asset: LendingRewardsSelectOption | null;
}

export interface BorrowingAssetFormData {
  asset: AssetSelectOption | null;
  collateral: AssetSelectOption | null;
}

export interface LendingInfo {
  poolAssetId: string;
  poolAssetSymbol: string;
  apr: number;
  amount: number;
  rewards: number;
}

export interface Collateral {
  collateralAssetId: string;
  collateralAssetSymbol: string;
  collateralAmount: number;
  borrowedAmount: number;
  interest: number;
  rewards: number;
}

export interface BorrowingInfo {
  poolAssetId: string;
  poolAssetSymbol: string;
  interestApr: number;
  rewardsApr: number;
  amount: number;
  interest: number;
  rewards: number;
  healthFactor: number;
  collaterals: Collateral[];
}

export interface StatsData {
  tvl: number;
  totalLent: number;
  totalBorrowed: number;
  totalRewards: number;
}

export interface DashboardData {
  lendingInfo: LendingInfo[];
  borrowingInfo: BorrowingInfo[];
  userData: StatsData;
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
  item: BorrowingInfo | null;
}
