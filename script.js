
window.onload = () => {
    const fram = document.querySelector('iframe')
    const nav = document.querySelector('div.nav')
    const tit = document.querySelector('div.tit')
    const lab = nav.querySelector('div.lab')
    const ul = nav.querySelector('ul')
    const li = ul.querySelectorAll('li')
    const ig = lab.querySelector('img')
    const lb = lab.querySelector('label')

    /*document.addEventListener('click', () => {
        (!lab.contains(event.target)) ?
        setTimeout(() => {
            ul.removeAttribute('style')
            lb.removeAttribute('style')
            ig.removeAttribute('style')
        }) : null
    })*/

    /*lab.addEventListener('click', () => {
        ul.style.display = 'flex'
        lb.style.display = 'block'
        ig.style.animation = 'img 0.5s'
    })*/

    li.forEach(li => {
        li.addEventListener('click', () => {
            ul.style.display = 'none'
            lb.style.display = 'none'
            setTimeout(() => {
                ul.removeAttribute('style')
                lb.removeAttribute('style')
            })
            tit.innerText = li.innerText
            switch (tit.innerText.toLowerCase()) {
                case 'modules':
                    fram.src = './pages/module/module.html'
                    break;
                case 'tests':
                    fram.src = './pages/test/test.html'
                    break;
                case 'download':
                    fram.src = './pages/download/download.html'
                    break;
                case 'about':
                    fram.src = './pages/about/about.html'
                    break;
                default:
                    fram.src = './pages/home/home.html'
                    break;
            }
        })
    })
}