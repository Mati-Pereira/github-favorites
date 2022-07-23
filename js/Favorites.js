import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites: ")) || []
  }

  save() {
    localStorage.setItem("@github-favorites: ", JSON.stringify(this.entries))
  }

  async add(username) {

    try {
      const userExists = this.entries.find(entry => entry.login === username)
      if (userExists) {
        throw new Error("Usuário já cadastrado")
      }
      const user = await GithubUser.search(username)
      if (user.login === undefined) {
        throw new Error("Usuário não encontrado")
      }
      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    }

    catch {
      error => console.log(error)
    }
  }

  delete(user) {
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login)
    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  
  constructor(root) {
    
    super(root)
    this.tbody = this.root.querySelector("table tbody")
    this.update()
    this.onAdd()
  }

  onAdd() {
    const addButton = this.root.querySelector(".search button")
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input")
      this.add(value)
    }
  }

  update() {
    this.removeAlltr()
    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector(".profile img").src = `https://github.com/${user.login}.png`
      row.querySelector(".profile img").alt = `Imagem de ${user.name}`
      row.querySelector(".profile p").textContent = user.name
      row.querySelector(".profile span").textContent = user.login
      row.querySelector(".repositories").textContent = user.public_repos
      row.querySelector(".followers").textContent = user.followers
      row.querySelector(".button").onclick = () => {
        const isOK = confirm("Tem certeza que quer deletar ")
        if (isOK) {
          this.delete(user)
        }
      }
      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement("tr")
    const content = `
    <td class="profile">
    <img src="https://github.com/Mati-Pereira.png" alt="profile-picture" >
    <a href="https://github.com/Mati-Pereira">
    <p>Matheus</p>
    <span>olá</span>
    </td>
    <td class="repositories"></td>
    <td class="followers"></td>
    <td>
    <button class="button">&times;</button>
    </td>
    `
    tr.innerHTML = content
    return tr
  }

  removeAlltr() {
    this.tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove()
      })
  }
}