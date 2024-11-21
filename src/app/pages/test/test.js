import { createForms, crct, getAnswer, nav_visible } from "./utils.js";
import { api, frame } from "../../script.js";
 

let min = 1;
let max = 50;
let disp_min = 1;
let disp_max = 10;
export let json_data = Array();
export let correct = Array(max);
export let answer = Array.from({ length: max }, () => Array());

frame[0].onload = async () => {
    console.log('in test');
    
    json_data = await api.decode({ key: ' ', iv: '', file: 'form.b64' })
    //json_data = await decode(' ', '', '../../../../data/form.b64');
    console.log(json_data);
    
    const frameContent = frame[0]
    console.log(frameContent);

    //const next = frameContent.getElementById("next");
    const next = frameContent.$('#next')[0];
    console.log(next);
    
    next.addEventListener('click', async () => {
        if (next.style.visibility != 'hidden') {
            frameContent.querySelectorAll('form').forEach((/** @type {{ style: { display: string; }; }} */ form) => {
                form.style.display = 'none';
            });
            for (let i = disp_min; i < disp_min + disp_max; i++) {
                frameContent.getElementById('f' + i).removeAttribute('style');
            }
            disp_min += disp_max;
        }
        nav_visible(disp_min, disp_max);
    });

    const back = frameContent.getElementById("back");
    back.addEventListener('click', async () => {
        if (back.style.visibility != 'hidden') {
            frameContent.querySelectorAll('form').forEach((/** @type {{ style: { display: string; }; }} */ form) => {
                form.style.display = 'none';
            });
            for (let i = disp_min - 1; i >= disp_min - disp_max; i--) {
                frameContent.getElementById('f' + (i - disp_max)).removeAttribute('style');
            }
            disp_min -= disp_max;
        }
        nav_visible(disp_min, disp_max);
    });

    const crct_elm = frameContent.getElementById("crct");
    crct_elm.addEventListener('click', async () => {
        if (crct_elm.innerText != 'Correct All') {
            for (let i = min; i <= max; i++) {
                frameContent.getElementById('f' + i + 'rst').click();
                answer = Array.from({ length: max }, () => Array());
            }
            crct_elm.innerText = 'Correct All';
        } else {
            let score = 0;
            let score_div = 0;
            await getAnswer(min, max + 1);
            for (let i = min; i <= max; i++) {
                crct(i);
            }
            correct.forEach((answer) => {
                if (answer !== undefined) {
                    (answer === 1) ? score++ : null;
                    score_div++;
                }
            });
            if (score_div != 0) {
                score = 41;
                score_div = 50;
                console.log(`score: ${score}/${score_div}`);
                frameContent.body.style.overflow = 'hidden'
                frameContent.body.style.marginRight = '17px';
                frameContent.getElementById('overlay').style.display = 'block';
                frameContent.getElementById('score_div').innerText = score_div;
                for (let i = 0; i <= score; i++) {
                    const score_elm = frameContent.getElementById('score');
                    setTimeout(() => {
                        score_elm.innerText = i;
                        score_elm.style.color = `hsl(${i * 120 / score_div}, 100%, 50%)`;
                    }, 30 * i)
                    //await delay(30);
                }
            }
            //crct_elm.innerText = 'Reset All';
        }
    });

    frameContent.getElementById('overlay__okay').addEventListener('click', (/** @type {{ preventDefault: () => void; }} */ event) => {
        event.preventDefault();
        frameContent.body.removeAttribute('style');
        frameContent.getElementById('overlay').removeAttribute('style');
    });

    frameContent.getElementById('overlay').addEventListener('click', (/** @type {{ target: any; }} */ event) => {
        if (!frameContent.getElementById('score__pop').contains(event.target)) {
            frameContent.body.removeAttribute('style');
            frameContent.getElementById('overlay').removeAttribute('style');
        }
    });

    frameContent.querySelectorAll('input[name="divider"]').forEach((/** @type {{ addEventListener: (arg0: string, arg1: () => void) => void; }} */ radio) => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                switch (this.id) {
                    case 'disp_radio_5':
                        disp_max = 10;
                        break;
                    case 'disp_radio_2':
                        disp_max = 25;
                        break;
                    case 'disp_radio_1':
                        disp_max = 50;
                        break;
                }
                disp_min = 1;
                frameContent.getElementById('next').click();
            }
        });
    });

    createForms(min, max);
    frameContent.getElementById('next').click();
};

/**
 * @param {Number} ms 
 * @returns {Promise<null>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onbeforeunload = () => {
    console.log('unload');
    //save_answer();
}

/*
async function hashMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // Encode as (utf-8)
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // Hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string
    console.log(hashBuffer);
    console.log(hashArray);
    
    return hashHex;
  }
  
  hashMessage("Hello, world!").then(console.log); // Logs the SHA-256 hash
  */