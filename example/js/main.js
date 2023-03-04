const tabs = document.querySelectorAll('.tabheader__item')
const tabsParent = document.querySelector('.tabheader__items')
const tabContent = document.querySelectorAll('.tabcontent')

const hideTabContent = () =>
{
    tabContent.forEach((item) => {
        item.style.display = 'none';
    })
    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active');
    })
}
hideTabContent()
const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tabheader__item_active')
}
showTabContent()

let tabCounter = 0;
const autoFunctionSlider = () =>
{
    if (tabCounter === 4) tabCounter = 0;
    hideTabContent()
    showTabContent(tabCounter);
    tabCounter++;
}
let autoSlider = setInterval( autoFunctionSlider, 1300);

tabsParent.addEventListener('click', (e) =>
{
    clearInterval(autoSlider)
    setTimeout(() => {
        autoSlider = setInterval( autoFunctionSlider, 1300);
    }, 3000);
    if (e.target.classList.contains('tabheader__item')) {
        const target = e.target
        tabs.forEach((item, i) =>
        {
            if (target === item) {
                hideTabContent()
                showTabContent(i)
                tabCounter = i;
            }
        })
    }
})

// modalka
const modal = document.querySelector(".modal")
const openModalKa = document.querySelector(".btn_white")
const closeModalKa = document.querySelector(".modal__close")
const openModalDark = document.querySelector(".btn_dark")

const openModal = () => {
    modal.classList.add("show")
    modal.classList.remove("hide")
    document.body.style.overflow = ""
}

const closeModal = () => {
    modal.classList.add("hide")
    modal.classList.remove("show")
    document.body.style.overflow = ''

}

openModalKa.addEventListener("click", openModal)
openModalDark.addEventListener("click", openModal)
closeModalKa.addEventListener("click", closeModal)

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight
    const scrollHeight = document.body.scrollHeight
    if (scrollPosition >= scrollHeight) {
        openModal()
    }
})

const forms = document.querySelectorAll("form")


const postData = (url, data) => {
    return fetch(url, {
        method: "POST",
        body: data
    })
}

const messages = {
    load: "loading",
    succes: "ok",
    fail: "error"
}

const bindPostData = (form) => {
    form.addEventListener("submit", (e)=>{
        e.preventDefault()

        const messageBlock = document.createElement("div")
        messageBlock.textContent = messages.load

        form.append(messageBlock)

        const formData = new FormData(form)

        const object = {}

        formData.forEach((item, name) => {
            object[name] = item
        })

        console.log(object)

        const json = JSON.stringify(object)

        postData("server.php", json)
            .then((response) => response.status)
            .then((data) => data === 200 ?
                messageBlock.textContent = messages.succes
                : messageBlock.textContent = messages.fail)
            .catch(() => console.error("error"))
    })
}

forms.forEach((item) => {
    bindPostData(item)
})