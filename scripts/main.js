const url = 'https://picsum.photos/v2/list?page=2&limit=10'
const cards = document.getElementById('cards')

const generateCardString = ({ title, text, urlImage }) => {
    const cardString = `<div class="card">
    <div class="card__image">
        <img src="${urlImage}" alt="" class="img" />
    </div>
    <div class="card__content">
        <h2 class="card__title">${title}</h2>
        <p class="card__text">${text}</p>
    </div></div>`

    return cardString
}

const getImages = async () => {
    const response = await fetch(url)
    const data = await response.json()
    data.forEach((element) => {
        const objectCard = {
            title: element.author,
            text: element.author,
            urlImage: element.download_url,
        }
        const card = generateCardString(objectCard)
        cards.innerHTML += card
    })

    setObserver()
}

const setObserver = () => {
    const options = {
        root: null,
        rootMargin: '150px 0px 0px 0px',
        threshold: 0.5,
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                getImages()
                observer.unobserve(entry.target)
            }
        })
    })
    observer.observe(cards.lastElementChild)
}
getImages()
