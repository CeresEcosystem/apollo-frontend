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

export interface GovernanceSelectedAnswer {
  answer: string;
  index: number;
}

export interface LendingAssetFormData {
  asset: AssetSelectOption | null;
}

export interface BorrowingAssetFormData {
  asset: AssetSelectOption | null;
  collateral: AssetSelectOption | null;
}

export interface LendingDataItem {
  id: number;
  asset: string;
  apr: number;
  amount: number;
  reward: number;
}

export interface LendingWithdrawModal {
  show: boolean;
  item: LendingDataItem | null;
}

export interface TransactionOverviewData {
  label: string;
  info: string;
}

export interface BorrowingDataItem {
  id: number;
  asset: string;
  apr: number;
  amount: number;
  interest: number;
  reward: number;
  healthFactor: number;
}

export interface BorrowingCollateralModal {
  show: boolean;
  item: BorrowingDataItem | null;
}
