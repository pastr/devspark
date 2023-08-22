// TODO: Move this to @devspark/types ?
export enum GithubPages {
  PullFiles = "/pull/{num}/files",
  PullConversation = "/pull/{num}",
  Pulls = "/pulls"
}


const pageRegex: Record<GithubPages, RegExp> = {
  [GithubPages.PullFiles]: /\/pull\/\d+\/files/,
  [GithubPages.PullConversation]: /\/pull\/\d+$/,
  [GithubPages.Pulls]: /\/pulls$/
};

export class LocationService {

  static isCorrectPage(pageKey: GithubPages): boolean {
    const regex = pageRegex[pageKey];
    return regex.test(window.location.pathname);
  }

  static getCurrentURL(): URL {
    return new URL(window.location.href);
  }
}
