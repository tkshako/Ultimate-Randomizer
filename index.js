$(function() {
    let html = '';

    for (let i = 0; i < charNames.length; i++) {
        let char = charNames[i];
        html += `
            <span class="char">
                <input type="checkbox" id="char${i}" name="${char}" value="${char}" class="checkbox">
                <label for="char${i}">${char}</label>
            </span>
        `;
    }

    $('#randomizer').html(html);

    $('#generate').click(generate);

    $('#select').click(selectAll);
    $('#deselect').click(deselectAll);

    $('#generateLink').click(generateLink);

    $('#presetRandom').click(applyRandom);

    $('.checkbox').click(toggleColor);
    $('.checkbox').parent().click(toggle);

    let path = window.location.pathname.split('/');
    if (path[2].length > 0) {
        applyLink(path[2]);
    } else {
        selectAll();
    }
});

function selectAll() {
    $('.checkbox').each(function() {
        $(this).prop('checked', true);
        toggleColor(this.id);
    });
}

function deselectAll() {
    $('.checkbox').each(function() {
        $(this).prop('checked', false);
        toggleColor(this.id);
    });
}

function applyRandom() {
    $('.checkbox').each(function() {
        let checkbox = $(this);
        if (Math.random() < 0.5) {
            checkbox.prop('checked', true);
        } else {
            checkbox.prop('checked', false);
        }
        
        toggleColor(this.id);
    });
}

function toggle() {
    let checkbox = $($(this).children('input')[0]);
    let span = checkbox.parent();

    if (checkbox.prop('checked')) {
        checkbox.prop('checked', false);
        span.addClass('unselected');
        span.removeClass('selected');
    } else {
        checkbox.prop('checked', true);
        span.addClass('selected');
        span.removeClass('unselected')
    }
}

function toggleColor(id) {
    let checkbox;
    if (typeof(id) == 'string') {
        checkbox = $('#' + id);
    } else {
        checkbox = $(this);
    }

    let span = checkbox.parent();

    if (checkbox.prop('checked')) {
        span.addClass('selected');
        span.removeClass('unselected');
    } else {
        span.addClass('unselected');
        span.removeClass('selected');
    }
}

function generate() {
    let selected = [];
    $('.checkbox').each(function() {
        if ($(this).prop('checked')) {
            selected.push(this.name);
        }
    });

    $('#results').text('You rolled ' + selected[Math.floor(Math.random() * selected.length)] + '!');
}

function generateLink() {
    let cur64 = 0;
    let base64String = '';

    $('.checkbox').each(function(i) {
        if ($(this).prop('checked')) {
            cur64 += Math.pow(2, i % 6);
        }

        if (i % 6 == 5) {
            base64String += toBase64(cur64);
            cur64 = 0;
        }
    });

    base64String += toBase64(cur64);
    
    let path = window.location.pathname.split('/');
    window.alert(window.location.origin + "/" + path[1] + "/" + base64String);
}

function applyLink(encoding) {
    let charArray = [];

    for (let i = 0; i < encoding.length; i++) {
        let cur64 = fromBase64(encoding[i]);

        for (let j = 0; j < 6; j++) {
            charArray[6 * i + j] = cur64 % 2 === 1;
            cur64 = Math.floor(cur64 / 2);
        }
    }

    $('.checkbox').each(function(i) {
        let checkbox = $(this);
        if (charArray[i]) {
            checkbox.prop('checked', true);
        } else {
            checkbox.prop('checked', false);
        }
        
        toggleColor(this.id);
    });
}

function toBase64(n) {
    if (n <= 25) {
        return String.fromCharCode(65 + n);
    } else if (n <= 51) {
        return String.fromCharCode(97 + n - 26);
    } else if (n <= 61) {
        return String.fromCharCode(48 + n - 52);
    } else if (n === 62) {
        return '+';
    } else {
        return '/';
    }
}

function fromBase64(s) {
    let code = s.charCodeAt(0);
    if (code >= 65 && code <= 90) {
        return code - 65;
    } else if (code >= 97 && code <= 122) {
        return code - 97 + 26;
    } else if (code >= 48 && code <= 57) {
        return code - 48 + 52;
    } else if (code === 43) {
        return 62;
    } else {
        return 63;
    }
}