export class GithubUser {
  static async search(username) {
    const endPoint = `https://api.github.com/users/${username}`
    const data = await fetch(endPoint)
    const { login, name, public_repos, followers } = await data.json()
    return ({
      login,
      name,
      public_repos,
      followers,
    })
  }
}