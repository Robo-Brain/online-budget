$("#addNote").click(function (x) {
    x.preventDefault();
    var date = $('#date').val();
    var text = $('#text').val();
    var isRemind = $('#isRemind').is(':checked');

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/addNote",
        data : JSON.stringify({date: date, text: text, remind: isRemind}),
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    });
});

function appendNotes() {
    for (i = 0; i < notes.length; i++) {
        $("#notesTable").append(
            "<div class='divTableRow " + notes[i].id + "'>" +
                "<input type='hidden' id='id' name='id' value='" + notes[i].id + "' />" +
                "<div class='divTableCell " + notes[i].id + "'>" + notes[i].date + "</div>" +
                "<div class='divTableCell " + notes[i].id + "'>" + notes[i].text + "</div>" +
                "<div class='divTableCell " + notes[i].id + "'>" + notes[i].remind + "</div>" +
                "<div class='divTableCell " + notes[i].id + "'>" + notes[i].muted + "</div>" +
                "<div class='divTableCell " + notes[i].id + "'>" +
                    "<div class='editButtons'>" +
                    "<button class='editButton' id='" + notes[i].id + "'>EDIT</button>&nbsp;" +
                    "<button class='delButton' id='" + notes[i].id + "'>DEL</button>" +
                    "</div>" +
                "</div>" +

            "<div class='divTableCell hidden " + notes[i].id + "'>" +
                "<input type='hidden' id='noteId' name='noteId' value='" + notes[i].id + "' />" +
                "<input style='width: 90px;' type='text' id='noteDate" + notes[i].id + "' name='noteDate' class='date' value='" + notes[i].date + "' />" +
            "</div>" +
            "<div class='divTableCell hidden " + notes[i].id + "'>" +
                "<textarea rows='4' cols='50' id='noteText" + notes[i].id + "' name='noteText' >" + notes[i].text + "</textarea>" +
            "</div>" +
            "<div class='divTableCell hidden " + notes[i].id + "'>" +
                "<label class='switch'>" +
                "<input type='checkbox' id='isRemind" + notes[i].id + "' class='" + notes[i].remind +"' name='isRemind' />" +
                    "<span class='slider'></span>" +
                "</label>" +
            "</div>" +
            "<div class='divTableCell hidden " + notes[i].id + "'>" +
                "<label class='switch'>" +
                    "<input type='checkbox' id='isMuted" + notes[i].id + "' class='"+ notes[i].muted +"' name='isMuted' />" +
                    "<span class='slider'></span>" +
                "</label>" +
            "</div>" +
            "<div class='divTableCell hidden " + notes[i].id + "'>" +
                "<div class='salaryHiddenButtons'>" +
                    "<button class='saveButton' id='" + notes[i].id + "'>✓</button><button class='cancelButton' id='" + notes[i].id + "'>X</button>" +
                "</div>" +
            "</div>" +

            "</div>");

        $('.true').prop('checked', true);
        $('.false').prop('unchecked', false);
    }
}

$(".divTableCell.hidden").hide();

function searchForRemind() {
    var today = new Date();
    var nowAYear = today.getFullYear();
    var nowAMonth = today.getMonth() + 1;
    var nowAday = today.getDate();

    for (i = 0; i < notes.length; i++) {
        var arrIsMuted = notes[i].muted;
        var arrIsRemind = notes[i].remind;

        if (arrIsRemind == 1 && arrIsMuted == 0) {

            var date = notes[i].date;
            var notesYear = date.substring(0,4);
            var notesMonth = date.substring(5,7);
            var notesDay = date.substring(8,10);

            if (notesYear <= nowAYear && notesMonth <= nowAMonth && notesDay <= nowAday) {
                notice(notes[i].id);
            }
        }
    }
}

function notice(id) {
    var n = new Noty({
        type: 'error',
        theme: 'metroui',
        text: notes[i].text,
        buttons: [
            Noty.button('DONE', 'btn btn-success', function () {
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "post",
                    url: "/muteNote",
                    data : JSON.stringify(id)
                });
                n.close();
            }),
            Noty.button('NOPE', 'btn btn-error', function () {
                n.close();
            })
        ]
    }).show();
}

function editNoteFunc(i) {
    var id = i;

    $('.divTableCell').show();
    $('.divTableCell.hidden').hide();

    $('.divTableCell.' + id).hide();
    $('.divTableCell.hidden.' + id).show();
}

function deleteNoteFunc(i) {
    var id = i;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/delNote",
        data : id,
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    });
}

function saveNoteFunc(i) {
    var noteId = i;
    var noteDate = $('#noteDate' + noteId).val();
    var noteText = $('#noteText' + noteId).val();
    var noteIsRemind = $('#isRemind' + noteId).is(':checked');
    var noteIsMuted = $('#isMuted' + noteId).is(':checked');

    existNoteData = JSON.stringify({id: noteId, date: noteDate, text: noteText, remind: noteIsRemind, muted: noteIsMuted});

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/saveExistSalary",
        dataType : 'json',
        data : existNoteData,
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    })
}

$(function() {
    $(".date").datepicker({
        dateFormat: "yy-mm-dd"
    });
    $("#date").datepicker({
        dateFormat: "yy-mm-dd"
    });
});