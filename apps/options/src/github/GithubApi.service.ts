// TODO: Since this is react I guess it would be better to have a hook instead..
export class GithubApi {
  static async getGithubUser(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    if (user.message === "Not Found") {
      return null;
    }
    return user;
  }
}
