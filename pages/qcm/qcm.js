import { createForms, crct, getAnswer, nav_visible } from "./utils.js";
import { decode, encode } from "../cryptor.js";

let min = 1;
let max = 50;
let disp_min = 1;
let disp_max = 10;
export let json_data = Array();
export let correct = Array(max);
export let answer = Array.from({ length: max }, () => Array());

window.onload = async () => {
    json_data = await decode(' ', '', '../../../data/form.b64');

    const next = document.getElementById("next");
    next.addEventListener('click', async () => {
        if (next.style.visibility != 'hidden') {
            document.querySelectorAll('form').forEach(form => {
                form.style.display = 'none';
            });
            for (let i = disp_min; i < disp_min + disp_max; i++) {
                document.getElementById('f' + i).removeAttribute('style');
            }
            disp_min += disp_max;
        }
        nav_visible(disp_min, disp_max);
    });

    const back = document.getElementById("back");
    back.addEventListener('click', async () => {
        if (back.style.visibility != 'hidden') {
            document.querySelectorAll('form').forEach(form => {
                form.style.display = 'none';
            });
            for (let i = disp_min - 1; i >= disp_min - disp_max; i--) {
                document.getElementById('f' + (i - disp_max)).removeAttribute('style');
            }
            disp_min -= disp_max;
        }
        nav_visible(disp_min, disp_max);
    });

    const crct_elm = document.getElementById("crct");
    crct_elm.addEventListener('click', async () => {
        if (crct_elm.innerText != 'Correct All') {
            for (let i = min; i <= max; i++) {
                document.getElementById('f' + i + 'rst').click();
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
                document.body.style.overflow = 'hidden'
                document.body.style.marginRight = '17px';
                document.getElementById('overlay').style.display = 'block';
                document.getElementById('score_div').innerText = score_div;
                for (let i = 0; i <= score; i++) {
                    const score_elm = document.getElementById('score');
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

    document.getElementById('overlay__okay').addEventListener('click', event => {
        event.preventDefault();
        document.body.removeAttribute('style');
        document.getElementById('overlay').removeAttribute('style');
    });

    document.getElementById('overlay').addEventListener('click', event => {
        if (!document.getElementById('score__pop').contains(event.target)) {
            document.body.removeAttribute('style');
            document.getElementById('overlay').removeAttribute('style');
        }
    });

    document.querySelectorAll('input[name="divider"]').forEach(radio => {
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
                document.getElementById('next').click();
            }
        });
    });

    createForms(min, max);
    document.getElementById('next').click();
}

/**
 * @param {Number} ms 
 * @returns {Promise}
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