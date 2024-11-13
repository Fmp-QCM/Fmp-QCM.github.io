import { json_data, answer, correct } from "./qcm.js";

/**
 * Generate Forms
 * @param {Number} min 
 * @param {Number} max
 */
export function createForms(min, max) {
    const container = document.getElementById('forms-container');
    document.getElementById('disp').innerText = json_data[0];
    container.innerHTML = "";

    for (let i = min; i <= max; i++) {
        // Create form element
        const form = document.createElement('form');
        form.setAttribute('action', '');
        form.setAttribute('id', 'f' + i);
        form.setAttribute('name', 'f' + i);
        form.setAttribute('class', 'form');
        form.style.display = 'none';

        // Create heading
        const heading = document.createElement('h2');
        heading.id = 'f' + i + 'h2';
        heading.style.margin = '10px';
        heading.innerText = 'Q' + i + '.' + json_data[i][0];
        form.appendChild(heading);

        // Create checkboxs
        for (let j = 1; j <= 5; j++) {
            const label = document.createElement('label');
            label.classList.add('check');
            label.id = 'f' + i + 'l' + j;
            label.setAttribute('for', 'f' + i + 'q' + j);

            const input = document.createElement('input');
            input.classList.add('check__input', 'btns');
            input.type = 'checkbox';
            //(answer[i - 1].includes(j)) ? input.checked = true : null;
            input.id = 'f' + i + 'q' + j;

            const div = document.createElement('div');
            div.classList.add('check__box');

            label.appendChild(input);
            label.appendChild(div);
            label.append(json_data[i][1][j - 1]);
            form.appendChild(label);
            form.appendChild(document.createElement('br'));
        }

        // Add correct and reset buttons
        const correctLabel = document.createElement('label');
        correctLabel.classList.add('btns__style', 'float_right', 'click');
        correctLabel.setAttribute('for', 'f' + i + 'crct');

        const correctInput = document.createElement('button');
        correctInput.classList.add('btns');
        correctInput.id = 'f' + i + 'crct';
        correctInput.addEventListener('click', async () => {
            await getAnswer(i, i + 1);
            crct(i);
        });
        correctLabel.appendChild(correctInput);
        correctLabel.append('Correct');

        const resetLabel = document.createElement('label');
        resetLabel.classList.add('btns__style', 'float_right', 'click');
        resetLabel.setAttribute('for', 'f' + i + 'rst');

        const resetInput = document.createElement('input');
        resetInput.classList.add('btns');
        resetInput.type = 'reset';
        resetInput.id = 'f' + i + 'rst';
        resetInput.addEventListener('click', () => rst(i));
        resetLabel.appendChild(resetInput);
        resetLabel.append('Reset');

        form.appendChild(resetLabel);
        form.appendChild(correctLabel);

        // Append form to container
        container.appendChild(form);
    }
}

/**
 * Correct Answers
 * @param {Number} form
 */
export function crct(form) {
    event.preventDefault();
    if (answer[form - 1].length !== 0) {
        document.getElementById('f' + form + 'h2').innerText = 'Corrected';
        if (JSON.stringify(json_data[form][2].slice().sort()) === JSON.stringify(answer[form - 1].slice().sort())) {
            correct[form - 1] = 1;
        }
        else correct[form - 1] = 0;

        for (let i = 1; i <= 5; i++) {
            const label = document.getElementById('f' + form + 'l' + i);
            console.log(json_data[form][2], answer[form - 1]);
            if (json_data[form][2].includes(i) && answer[form - 1].includes(i)) {
                label.style.color = 'rgb(88, 255, 88)';
            }
            else if (json_data[form][2].includes(i) && !answer[form - 1].includes(i)) {
                label.style.color = 'rgb(255, 238, 0)';
            }
            else if (!json_data[form][2].includes(i) && answer[form - 1].includes(i)) {
                label.style.color = 'rgb(255, 50, 50)';
            }
        }
    }

}

/**
 * Reset Answers
 * @param {Number} form
 */
export function rst(form) {
    document.getElementById('f' + form + 'h2').innerText = 'Q' + form + '.' + json_data[form][0];
    for (let i = 1; i <= 5; i++) {
        document.getElementById('f' + form + 'l' + i).removeAttribute('style');
    }
}

/**
 * Get Answers
 * @param {Number} start
 * @param {Number} end
 */
export async function getAnswer(start, end) {
    console.log(start, end);

    for (let i = start; i < end; i++) {
        let tmp_answer = Array();
        for (let j = 1; j <= 5; j++) {
            if (document.getElementById('f' + i + 'q' + j).checked) {
                tmp_answer.push(j);
                console.log(tmp_answer);
            }
        }
        answer[i - 1] = tmp_answer;
    }
}

/**
 * Toggel Navigation Buttons
 * @param {Number} min 
 * @param {Number} max 
 */
export function nav_visible(min, max) {
    if (min - max <= 1) {
        document.getElementById('label_back_1').style.visibility = 'hidden';
        document.getElementById('label_back_2').style.visibility = 'hidden';
        //document.getElementById('disp').style.display = 'inline-block';
    } else {
        document.getElementById('label_back_1').style.visibility = 'visible';
        document.getElementById('label_back_2').style.visibility = 'visible';
        //document.getElementById('disp').style.display = 'none';
    }
    if (min >= 50) {
        document.getElementById('label_next_1').style.visibility = 'hidden';
        document.getElementById('label_next_2').style.display = 'none';
        document.getElementById('crct').style.display = 'inline-block';
    } else {
        document.getElementById('label_next_1').style.visibility = 'visible';
        document.getElementById('label_next_2').style.display = 'inline-block';
        document.getElementById('crct').style.display = 'none';
    }
}

