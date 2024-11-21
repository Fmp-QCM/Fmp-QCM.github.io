/** Global Imported Scripts
 * import $ from "../electron/jquery.js";
 * import from "./pages/*"
 */

/**
 * @typedef {import('jquery')} $
 */

/**
 * @param {String} title 
 */
const loadPage = (title) => {
    switch (title.toLowerCase()) {
        case 'modules':
            frame.load('./pages/module/module.html');
            loadScript('./pages/module/module.js');
            break;
        case 'qcm':
            frame.load('./pages/test/test.html');
            loadScript('./pages/test/test.js');
            break;
        case 'download':
            frame.load('./pages/download/download.html');
            loadScript('./pages/download/download.js');
            break;
        case 'about':
            frame.load('./pages/about/about.html');
            loadScript('./pages/about/about.js');
            break;
        default:
            frame.load('./pages/home/home.html')
            loadScript('./pages/home/home.js');
            break;
    }
};    

/**
 * @param {String} src 
 */
const loadScript = (src) => {
    console.log(src);
    
    /* Remove any existing dynamically added scripts
    const pagejs = document.getElementById('pagejs').remove()

    // Create a new script element
    const script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    script.id = 'pagejs'
    script.onload = () => console.log(`Script ${src} loaded successfully`);
    script.onerror = () => console.error(`Failed to load script ${src}`);

    // Append the new script to the document
    document.body.appendChild(script);*/
};

export const frame = $('main#main')[0];

window.onload = () => {
    const nav = document.querySelector('div.nav')
    const tit = document.querySelector('div.tit')
    const lab = nav.querySelector('div.lab')
    const ul = nav.querySelector('ul')
    const li = ul.querySelectorAll('li')
    const ig = lab.querySelector('img')
    const lb = lab.querySelector('label')

    li.forEach(li => {
        li.addEventListener('click', () => {
            ul.style.display = 'none'
            lb.style.display = 'none'
            setTimeout(() => {
                ul.removeAttribute('style')
                lb.removeAttribute('style')
            })
            
            loadPage(tit.innerText = li.innerText)
        })
    });
    loadPage('qcm');
}

    
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