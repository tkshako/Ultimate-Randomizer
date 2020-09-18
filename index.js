const chars = [];
for (let i = 0; i < charNames.length; i++) {
    chars.push({
        id: charCodes[i],
        name: charNames[i],
    });
}

$(function() {
    let html = '';

    for (char of chars) {
        html += `
            <span class="char">
                <input type="checkbox" id="${char.id}" name="${char.name}" value="${char.id}" class="checkbox">
                <label for="${char.id}">${char.name}</label>
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

    selectAll();
});

function selectAll() {
    $('input[type=checkbox]').each(function() {
        $(this).prop('checked', true);
        toggleColor(this.id);
    });
}

function deselectAll() {
    $('input[type=checkbox]').each(function() {
        $(this).prop('checked', false);
        toggleColor(this.id);
    });
}

function applyPreset(preset) {
    let chars = preset.data.preset;

    $('input[type=checkbox]').each(function() {
        let checkbox = $(this);

        if (chars.includes(checkbox.val())) {
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
    $('input[type=checkbox]').each(function() {
        if ($(this).prop('checked')) {
            selected.push(this.name);
        }
    });

    window.alert(selected[Math.floor(Math.random() * selected.length)]);
}