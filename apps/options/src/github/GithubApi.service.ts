export class GithubApi {
  static async getGithubUser(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    return user;
  }
}
