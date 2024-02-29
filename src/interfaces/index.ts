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
