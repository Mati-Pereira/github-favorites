export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    const entries = [
      {
        login: 'Mati-Pereira',
        name: "Matheus Rodrigues",
        public_repos: "20",
        followers: "1000s"
      },
      {
        login: 'Lucas',
        name: "Matheus Rodrigues",
        public_repos: "20",
        followers: "1000s"
      },
    ]
    this.entries = entries
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
  }

  update() {
    this.removeAlltr()
    this.entries.forEach(user => {
      const row = this.createRow()
      console.log(row);
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
        <td>100</td>
        <td>2000</td>
        <td>
        <button>&times;</button>
        </td>
        `
    tr.innerHTML = content
    return tr
  }

  removeAlltr() {
    const tbody = this.root.querySelector("table tbody")
    tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove()
        console.log(tr);
      })
  }
}