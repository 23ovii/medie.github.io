function scrollDown() {
    var element = document.getElementById("output"); 

    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
document.addEventListener("DOMContentLoaded", function() {
    var numNotesInput = document.getElementById("numNotes");
    numNotesInput.focus();
});
document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            const activeElement = document.activeElement;
            if (activeElement.tagName === "INPUT") {
                event.preventDefault();
                const inputs = document.querySelectorAll('input');
                const index = Array.prototype.indexOf.call(inputs, activeElement);
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    document.getElementById('calculateButton').click();
                }
            }
        }
    });
});

function createNotesInputs(num) {
    const notesInput = document.getElementById('notesInput');
    notesInput.innerHTML = '';
    for (let i = 0; i < num; i++) {
        const label = document.createElement('label');
        label.textContent = `Nota ${i + 1}:`;
        const input = document.createElement('input');
        input.type = 'tel';
        input.classList.add('note');
        input.id = `numNotes_${i}`;
        input.addEventListener('input', function(event) {
            validateNumber(event);
        });
        input.maxLength = 2;
        notesInput.appendChild(label);
        notesInput.appendChild(input);
    }
}
function validateNumber(event) {
    var input = event.target;
    var numericValue = input.value.replace(/\D/g, '');
    var maxValue = input.id.startsWith("numNotes_") ? 10 : 15;

    if (parseInt(numericValue) > maxValue) {
        input.value = input.value.substring(0, input.value.length - 1);
    }
}
document.getElementById('numNotes').addEventListener('input', (event) => {
    const numNotes = parseInt(event.target.value);
    if (!isNaN(numNotes) && numNotes > 0) {
        createNotesInputs(numNotes);
    }
});


function calculate() {
    let i, a = [], b = 0, t, ni, npi, bp, zece = 0, noua = 0;
    let n, ma, pi, pin, mn, np;

    n = parseFloat(document.getElementById('numNotes').value);
    const notes = document.querySelectorAll('.note');
    for (i = 0; i < n; i++) {
        a[i] = parseFloat(notes[i].value);
        b = b + a[i];
    }
    ma = b / n;
    const output = document.getElementById('output');
    output.innerHTML = `Media ta actuală este - ${ma.toFixed(2)}<br>`;


    pi = ma - Math.floor(ma);
    if (ma > 9.5) {
        output.innerHTML = `Media ta actuală este - ${ma.toFixed(2)}<br>`;
    }
    if (ma < 9.5) {
bp = b;
np = n;
        if (pi >= 0.5) {
            while(pi >= 0.5) {
                bp = bp + 10;
                np = np + 1;
                mn = bp / np;
                pi = mn - Math.floor(mn);
                zece++;
            }
            while (pi < 0.5) {
                bp = bp + 10;
                np = np + 1;
                mn = bp / np;
                pi = mn - Math.floor(mn);
                zece++;
            }
        }
        if (pi < 0.5) {
            while (pi < 0.5) {
                bp = bp + 10;
                np = np + 1;
                mn = bp / np;
                pi = mn - Math.floor(mn);
                zece++;
            }
        }
        output.innerHTML += zece === 1 ? `Pentru a-ți crește media cu un punct ai nevoie de ${zece} notă de zece.<br>` : `Pentru a-ți crește media cu un punct ai nevoie de ${zece} note de zece.<br>`;
        scrollDown();
    }
}

