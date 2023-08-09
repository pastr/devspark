export const GITHUB_OBSERVED_URLS = {
  PullRequestReviewDecisions: /https:\/\/github\.com\/pull_request_review_decisions/, // e.g. "https://github.com/pull_request_review_decisions"
  ShowPartial: /https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/\d+\/show_partial\?partial=issues%2Fsidebar/, // e.g. "https://github.com/evooq/benzene/issues/1457/show_partial?partial=issues%2Fsidebar"
  ApprovePR: /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)\/reviews/ // "https://github.com/evooq/benzene/pull/1489/reviews"
};
