const url = 'https://picsum.photos/v2/list?page=2&limit=10'
const cards = document.getElementById('cards')

const generateCardString = ({ title, text, urlImage }) => {
    const card = document.createElement('div')
    card.setAttribute('class', 'card')

    const cardImage = document.createElement('div')
    cardImage.setAttribute('class', 'card__image')

    const image = document.createElement('img')
    image.setAttribute('src', urlImage)
    image.setAttribute('alt', title)
    image.setAttribute('class', 'img')

    cardImage.appendChild(image)
    card.appendChild(cardImage)

    const cardContent = document.createElement('div')
    cardContent.setAttribute('class', 'card__content')

    const cardTitle = document.createElement('h2')
    cardTitle.setAttribute('class', 'card__title')
    cardTitle.textContent = title

    const cardText = document.createElement('p')
    cardText.setAttribute('class', 'card__text')
    cardText.textContent = text

    cardContent.appendChild(cardTitle)
    cardContent.appendChild(cardText)
    card.appendChild(cardContent)

    return card
}

const getImages = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const fragment = document.createDocumentFragment()
    data.forEach((element) => {
        const objectCard = {
            title: element.author,
            text: element.author,
            urlImage: element.download_url,
        }
        const card = generateCardString(objectCard)
        fragment.appendChild(card)
    })
    cards.appendChild(fragment)
    setObserver()
}
const setObserver = () => {
    const optionsGetImages = {
        root: null,
        rootMargin: '300px 0px 0px 0px',
        threshold: 0,
    }
    const options = {
        root: null,
        rootMargin: '100px 0px 0px 0px',
    }
    const observerGetImages = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                getImages()
                observer.unobserve(entry.target)
            }
        }, cards.lastElementChild)
    }, optionsGetImages)

    observerGetImages.observe(cards.lastElementChild)

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show--card')
            }
        })
    }, options)

    const cardsArray = document.querySelectorAll('.card')
    cardsArray.forEach((card) => {
        observer.observe(card)
    })
}

getImages()
