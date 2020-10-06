const chars = [];
for (let i = 0; i < charNames.length; i++) {
    chars.push({
        code: charCodes[i],
        name: charNames[i],
    });
}

$(function() {
    let html = '';

    for (char of chars) {
        html += `
            <span class="char">
                <input type="checkbox" id="${char.code}" name="${char.name}" value="${char.code}" class="checkbox">
                <label for="${char.code}">${char.name}</label>
            </span>
        `;
    }

    $('#randomizer').html(html);

    $('#generate').click(generate);

    $('#select').click(selectAll);
    $('#deselect').click(deselectAll);

    $('#preset64').click({preset: preset64}, applyPreset);
    $('#presetMelee').click({preset: presetMelee}, applyPreset);
    $('#presetBrawl').click({preset: presetBrawl}, applyPreset);
    $('#preset4').click({preset: preset4}, applyPreset);
    $('#presetWeeb').click({preset: presetWeebs}, applyPreset);
    $('#presetHeavy').click({preset: presetHeavies}, applyPreset);
    $('#presetHell').click({preset: presetSpammers}, applyPreset);

    $('input[type=checkbox]').click(toggleColor);
    $('input[type=checkbox]').parent().click(toggle);

    if (document.cookie) {
        applyCookie();
    } else {
        selectAll();
    }
});

function selectAll() {
    $('input[type=checkbox]').each(function() {
        $(this).prop('checked', true);
        toggleColor(this.id);
    });

    setCookie();
}

function deselectAll() {
    $('input[type=checkbox]').each(function() {
        $(this).prop('checked', false);
        toggleColor(this.id);
    });

    setCookie();
}

function applyPreset(preset) {
    let chars;
    if (preset.data) {
        chars = preset.data.preset;
    } else {
        chars = preset;
    }

    $('input[type=checkbox]').each(function() {
        let checkbox = $(this);
        if (chars.includes(checkbox.val())) {
            checkbox.prop('checked', true);
        } else {
            checkbox.prop('checked', false);
        }
        
        toggleColor(this.id);
    });

    setCookie();
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

    setCookie();
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
    $('input[type=checkbox]').each(function() {
        if ($(this).prop('checked')) {
            selected.push(this.name);
        }
    });

    $('#results').text('You rolled ' + selected[Math.floor(Math.random() * selected.length)] + '!');
}

function arrayToString(arr) {
    result = '';
    for (char of arr) {
        result += char;
        result += ',';
    }
    return result.slice(0, -1);
}

function setCookie() {
    console.log('test');

    let selected = [];
    $('input[type=checkbox]').each(function() {
        if ($(this).prop('checked')) {
            selected.push(this.id);
        }
    });

    document.cookie = 'charset=' + arrayToString(selected) + '; expires=Thu, 31 Dec 2099 23:99:99 UTC; secure';
}

function applyCookie() {
    let chars = document.cookie.split('=')[1];
    applyPreset(chars.split(','));
}