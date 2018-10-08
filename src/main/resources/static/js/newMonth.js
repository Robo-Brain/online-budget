function createNewMont() {
    console.log()
    $.ajax({
        type: "get",
        url : '/createNewMonth'
    })
    .done(function()  {
        $("#month-success").dialog({
            classes: {
                "ui-dialog-titlebar": "done-dialog-titlebar",
                "ui-dialog-buttonset": "done-button"
            },
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            draggable: false,
            buttons: {
                "OK": function () {
                    window.location = '/currentMonth';
                }
            }
        })
    })
    .fail(function(xhr)  {
        var err = JSON.parse(xhr.responseText);
        $("<div>" + err["message"] + "</div>").dialog({
            classes: {
                "ui-dialog": "ui-dialog-fail"
            },
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            draggable: false,
            buttons: {
                "OK": function () {
                    $(this).dialog("close");
                },
                "Ignore error": function () {
                    var ignore = false;
                    $(this).dialog("close");
                    $("#ignore").dialog({
                        classes: {
                            "ui-dialog": "ui-dialog-fail"
                        },
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        draggable: false,
                        buttons: {
                            "Create" : function () {
                                $(this).dialog("close");
                                ignore = $('#ignoreCheckbox').is(':checked');
                                if (ignore) {
                                    $.ajax({
                                        type: "get",
                                        url : '/createNewMonthUncheck'
                                    })
                                } else {
                                    alert('You must confirm an unprotected month creation!')
                                }
                            },
                            "Cancel" : function () {
                                $(this).dialog("close");
                            }
                        },
                        create:function () {
                            $(this).closest(".ui-dialog")
                                .find(".ui-button")
                                .eq(1)
                                .attr('id', 'confirmButton')
                                .addClass("inactive");
                            $('.ui-button.inactive').attr('disabled','disabled');
                        }
                    })
                }
            }
        })
    });
}
