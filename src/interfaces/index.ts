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
