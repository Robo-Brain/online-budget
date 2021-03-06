function appendNotes() {

    notes = notesArr.slice(0);
    notes.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
    });

    for (i = 0; i < notes.length; i++) {
        $("#notesTable").append(
            "<div class='divTableRow " + notes[i].id + " note'>"
                + "<input type='hidden' id='id' name='id' value='" + notes[i].id + "' />"
                + "<input type='hidden' id='spendId"+ notes[i].id + "' value='" + notes[i].stuckSpendId + "' />"
                + "<div class='divTableCell " + notes[i].id + " noteDate exist'>"
                    + "<span>" + notes[i].date + "</span>"
                    + "<span id='" + notes[i].id + "' class='bell " + notes[i].remind + "'>&nbsp;</span>"
                    + "<span class='remindBoolean'>" + notes[i].remind + "</span>"
                + "</div>"
                + "<div class='divTableCell hidden " + notes[i].id + " noteDate'>"
                    + "<input type='hidden' id='noteId' name='noteId' value='" + notes[i].id + "' />"
                    + "<input type='text' id='noteDate" + notes[i].id + "' name='noteDate' class='date' value='" + notes[i].date + "' />"
            + "</div>"
            + "<div title='" + notes[i].id + "' class='divTableCell " + notes[i].id + " noteTextCrop'>"
                + notes[i].text
            + "</div>"
            + "<div class='divTableCell hidden " + notes[i].id + " noteTextInput'>"
                + "<textarea class='noteTextarea' id='noteText" + notes[i].id + "' name='noteText' >" + notes[i].text + "</textarea>"
            + "</div>"
            + "<div class='divTableCell salaryEditButtons " + notes[i].id + "'>" +
                    "<div class='noteEditButtons'>" +
                        "<button class='editButton' id='" + notes[i].id + "'>EDIT</button>&nbsp;" +
                        "<button class='delButton' id='" + notes[i].id + "'>DEL</button>" +
                    "</div>" +
                "</div>" +
                    "<div class='divTableCell hidden salaryEditButtons " + notes[i].id + "'>" +
                        "<div class='salaryHiddenButtons'>" +
                            "<button class='saveButton' id='" + notes[i].id + "'>✓</button><button class='cancelButton' id='" + notes[i].id + "'>X</button>" +
                        "</div>" +
                    "</div>" +

            "</div>");

        $('.true').prop('checked', true);
        $('.false').prop('unchecked', false);

        if (notes[i].stuckSpendId != null) $('#' + notes[i].id).hide();

        if (notes[i].text.length <= 35) $('.divTableCell.' + notes[i].id + '.noteTextCrop').addClass('short')
    }
}

$(function() {
    $('.noteTextCrop').click(function () {
        var id = $(this).attr('title');
        var thisClass = '.divTableCell.' + id + '.noteTextCrop';

        if ($(thisClass).hasClass('short')) {
            thisClass = null;
        }

        if ($(thisClass).hasClass('shown')) {
            $(thisClass).css({"white-space": "nowrap", "overflow": "hidden"});
            $(thisClass).removeClass('shown')
        } else {
            $(thisClass).css({"white-space": "normal", "overflow": "auto", "word-break": "break-all"});
            $(thisClass).addClass('shown')
        }
    });
});

$(".addNotePC").click(function (x) {
    x.preventDefault();
    addNote( $('#date').val(), $('#text').val(), $('#isRemind').is(':checked'), spendId);
});

$('.addNoteMobile').click(function (a) {
    a.preventDefault();
    $("#mobileAddNote").dialog({
        classes: {
            "ui-dialog": "ui-dialogMobile"
        },
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Add": function() {
                $( this ).dialog( "close" );
                addNote( $('#mobileDate').val(), $('#mobileText').val(), $('#mobileIsRemind').is(':checked'), spendId);
            },
            Cancel: function() {
                $(this).dialog( "close" );
                $(this).remove();
            }
        }
    });

});

function addNote(date, text, remind, spendId) {

    if (text == '') {
        text = null;
    }

    var req = {date: date, text: text, remind: remind, stuckSpendId: spendId};
console.log(req);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/addNote",
        data : JSON.stringify(req),
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    });

}

$(function() {
    $(".divTableCell.hidden").hide();
});

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
                    url: "/muteUnmuteNote",
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

$(function() {
    $(".editButton").click(function(e) {
        e.preventDefault();
        var id = $(this).attr('id');

        $('.divTableCell').show();
        $('.divTableCell.hidden').hide();

        $('.divTableCell.' + id).hide();
        $('.divTableCell.hidden.' + id).show();
    });
});

$(function() {
    $(".delButton").click(function(d) {
        d.preventDefault();
        var id = $(this).attr('id');
        $("<div>Are you sure?</div>").dialog({
            classes: {
                "ui-dialog": "ui-dialogNew"
            },
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Delete note": function() {
                    $( this ).dialog( "close" );

                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        type: "post",
                        url: "/delNote",
                        data : JSON.stringify(id),
                        success: $(document).ajaxStop(function(){
                            window.location.reload();
                        })
                    });
                },
                Cancel: function() {
                    $(this).dialog( "close" );
                    $(this).remove();
                }
            }
        });
        // var id = $(this).attr('id');
        // $.ajax({
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     type: "post",
        //     url: "/delNote",
        //     data : id,
        //     success: $(document).ajaxStop(function(){
        //         window.location.reload();
        //     })
        // });
    });
});

$(function() {
    $(".saveButton").click(function (s) {
        s.preventDefault();
        var noteId = $(this).attr('id');
        var noteDate = $('#noteDate' + noteId).val();
        var noteText = $('#noteText' + noteId).val();
        var noteIsRemind = $('#isRemind' + noteId).is(':checked');
        var stuckSpendId = $('#spendId' + noteId).val();
        saveExistNote(noteId, noteDate, noteText, noteIsRemind, stuckSpendId);
    });
});

function saveExistNote(id, date, text, isRemind, stuckSpendId) {

    existNoteData = JSON.stringify({id: id, date: date, text: text, remind: isRemind, stuckSpendId: stuckSpendId});

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/saveExistNote",
        dataType : 'json',
        data : existNoteData,
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    })

}

$(function() {
    $(".cancelButton").click(function(c) {
        c.preventDefault();
        var id = $(this).attr('id');
        $('.divTableCell.' + id).show();
        $('.divTableCell.hidden.' + id).hide();
    });
});


$(function() {
    $(".date").pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd'
    });
    $("#date").pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd'
    });
    $("#mobileDate").pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd'
    });
});

$(function() {
    $(".bell").click(function (b) {
        b.preventDefault();

        var noteId = $(this).attr('id');
        noteIsRemind = null;

        if ($(this).hasClass('false')) {
            noteIsRemind = true;
            $(this).switchClass('false', 'true', 400, "swing");
        } else if ($(this).hasClass('true')) {
            noteIsRemind = false;
            $(this).switchClass('true', 'false', 400, "swing");
        }

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "post",
            url: "/muteUnmuteNote",
            data : JSON.stringify(noteId)
        });

    });
});
