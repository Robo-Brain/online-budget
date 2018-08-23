function appendAllWages() {
    for (i = 0; i < allWages.length; i++) {
        $("#salaryTable").append(
            "<div class='divTableRow salaryTable " + allWages[i].id + "'>" +
            "<input type='hidden' id='id' name='id' value='" + allWages[i].id + "' />" +

            "<div class='divTableCell salaryDate " + allWages[i].id + "'>" + allWages[i].salaryDate + "</div>" +
            "<div class='divTableCell salary " + allWages[i].id + "'>" + allWages[i].salary + " ₽</div>" +
            "<div class='divTableCell prepaidDate " + allWages[i].id + "'>" + allWages[i].prepaidDate + "</div>" +
            "<div class='divTableCell prepaid " + allWages[i].id + "'>" + allWages[i].prepaid + " ₽</div>" +
            "<div class='divTableCell salaryEditButtons " + allWages[i].id + "'>" +
                "<div class='editButtons'>" +
                    "<button class='editButton' id='" + allWages[i].id + "'>EDIT</button>&nbsp;" +
                    "<button class='delButton' id='" + allWages[i].id + "'>DEL</button>" +
                "</div>" +
            "</div>" +

            "<div class='divTableCell hidden salaryDate " + allWages[i].id + "'>" +
                "<input type='hidden' id='salaryIdInput' name='salaryId' value='" + allWages[i].id + "' />" +
                "<input type='text' class='date salary' id='salaryDateInput" + allWages[i].id + "' name='salaryDateInput' value='" + allWages[i].salaryDate + "' />" +
            "</div>" +
            "<div class='divTableCell hidden salary " + allWages[i].id + "'>" +
                "<input type='text' class='salaryInput' id='salaryInput" + allWages[i].id + "' name='salaryInput' value='" + allWages[i].salary + "' />" +
            "</div>" +
            "<div class='divTableCell hidden prepaidDate " + allWages[i].id + "'>" +
                "<input type='text' class='date prepaid' id='prepaidDateInput" + allWages[i].id + "' name='prepaidDateInput' value='" + allWages[i].prepaidDate + "' />" +
            "</div>" +
            "<div class='divTableCell hidden prepaid " + allWages[i].id + "'>" +
                "<input type='text' class='prepaidInput' id='prepaidInput" + allWages[i].id + "' name='prepaidInput' value='" + allWages[i].prepaid + "' />" +
            "</div>" +
            "<div class='divTableCell hidden salaryEditButtons " + allWages[i].id + "'>" +
                "<div class='salaryHiddenButtons'>" +
                    "<button class='saveButton' id='" + allWages[i].id + "'>✓</button><button class='cancelButton' id='" + allWages[i].id + "'>X</button>" +
                "</div>" +
            "</div>" +
        "</div>");
    }
}

function saveSalaryPrepaidFunc(buttonId) {
    existSalaryId = buttonId;
    existSalaryDate = $('#salaryDateInput' + buttonId).val();
    existSalaryAmount = $('#salaryInput' + buttonId).val();
    existPrepaidDate = $('#prepaidDateInput' + buttonId).val();
    existPrepaidAmount = $('#prepaidInput' + buttonId).val();

    existWageData = JSON.stringify({id: existSalaryId, salaryDate: existSalaryDate, salary: existSalaryAmount, prepaidDate: existPrepaidDate, prepaid: existPrepaidAmount});
    console.log(existWageData);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/editExistSalary",
        dataType : 'json',
        data : existWageData,
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    })
}

function addSalaryPrepaidMobile() {
    $("#addWageForm").dialog({
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
                var date = $('#mobileDate').val();
                var amount = $('#mobileAmount').val();
                var isSalary = $('#mobileSalaryPrepaid').is(':checked');
                addWage(date, amount, isSalary);
            },
            Cancel: function() {
                $(this).dialog( "close" );
                $(this).remove();
            }
        }
    });
}

function deleteSalaryPrepaidFunc(i) {
    var dialogClass = "ui-dialogNew";
    $(function() {
        if(screen.width<1000) {
            dialogClass = "ui-dialogMobile";
        }
    });
    var id = i;
    $("#dialog-confirm").dialog({
        classes: {
            "ui-dialog": "ui-dialogMobile"
        },
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Delete": function() {
                $( this ).dialog( "close" );
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "post",
                    url: "/delSalary",
                    data : id,
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
}

function editSalaryPrepaidFunc(i) {
    var id = i;

    $('.divTableCell').show();
    $('.divTableCell.hidden').hide();

    $('.divTableCell.' + id).hide();
    $('.divTableCell.hidden.' + id).show();
}

$(function() {
    $(".date").pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd'
    });
    $("#newDate").pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd'
    });
    $("#mobileDate").pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd'
    });
    $("#salaryDateInput").pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd'
    });
    $("#prepaidDateInput").pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd'
    });
});