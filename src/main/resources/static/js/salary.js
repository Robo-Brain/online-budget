function appendAllWages() {

    allWages = wages.slice(0);
    allWages.sort(function(a,b) {
        return new Date(b.salaryDate) - new Date(a.salaryDate);
    });

    for (i = 0; i < allWages.length; i++) {
        var sDate = allWages[i].salaryDate || '-';
        var pDate = allWages[i].prepaidDate || '-';
        var id = allWages[i].id;
        var salary = allWages[i].salary || 0;
        var prepaid = allWages[i].prepaid || 0;

        date = new Date(sDate), locale = "en-us", year = date.getFullYear(), month = date.toLocaleString(locale, { month: 'long'});
        if (year == '1970'){
            date = new Date(pDate), locale = "en-us", year = date.getFullYear(), month = date.toLocaleString(locale, { month: 'long'});
        }

        $("#salaryTable").append(
            "<div class='mobileWageDate'>" + year + ' ' + month + "</div>" +
            "<div class='divTableRow salaryTable " + id + "'>" +
            "<input type='hidden' id='id' name='id' value='" + id + "' />" +

            "<div class='divTableCell salaryDate " + id + "'>" + sDate + "</div>" +
            "<div class='divTableCell salary " + id + "'>" + salary + " ₽</div>" +
            "<div class='divTableCell prepaidDate " + id + "'>" + pDate + "</div>" +
            "<div class='divTableCell prepaid " + id + "'>" + prepaid + " ₽</div>" +
            "<div class='divTableCell salaryEditButtons " + id + "'>" +
                "<div class='editButtons'>" +
                    "<button class='editButton' id='" + id + "'>EDIT</button>&nbsp;" +
                    "<button class='delButton' id='" + id + "'>DEL</button>" +
                "</div>" +
            "</div>" +

            "<div class='divTableCell hidden salaryDate " + id + "'>" +
                "<input type='hidden' id='salaryIdInput' name='salaryId' value='" + id + "' />" +
                "<input type='text' class='date salary' id='salaryDateInput" + id + "' name='salaryDateInput' value='" + sDate + "' />" +
            "</div>" +
            "<div class='divTableCell hidden salary " + id + "'>" +
                "<input type='text' class='salaryInput' id='salaryInput" + id + "' name='salaryInput' value='" + salary + "' />" +
            "</div>" +
            "<div class='divTableCell hidden prepaidDate " + id + "'>" +
                "<input type='text' class='date prepaid' id='prepaidDateInput" + id + "' name='prepaidDateInput' value='" + pDate + "' />" +
            "</div>" +
            "<div class='divTableCell hidden prepaid " + id + "'>" +
                "<input type='text' class='prepaidInput' id='prepaidInput" + id + "' name='prepaidInput' value='" + prepaid + "' />" +
            "</div>" +
            "<div class='divTableCell hidden salaryEditButtons " + id + "'>" +
                "<div class='salaryHiddenButtons'>" +
                    "<button class='saveButton' id='" + id + "'>✓</button><button class='cancelButton' id='" + id + "'>X</button>" +
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