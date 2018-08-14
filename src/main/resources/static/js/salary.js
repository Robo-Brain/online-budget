function appendAllWages() {
    for (i = 0; i < allWages.length; i++) {
        $(".divTable").append(
            "<div class='divTableRow " + allWages[i].id + "'>" +
            "<input type='hidden' id='id' name='id' value='" + allWages[i].id + "' />" +

            "<div class='divTableCell " + allWages[i].id + "'>" + allWages[i].salaryDate + "</div>" +
            "<div class='divTableCell " + allWages[i].id + "'>" + allWages[i].salary + " ₽</div>" +
            "<div class='divTableCell " + allWages[i].id + "'>" + allWages[i].prepaidDate + "</div>" +
            "<div class='divTableCell " + allWages[i].id + "'>" + allWages[i].prepaid + " ₽</div>" +
            "<div class='divTableCell " + allWages[i].id + "'>" +
            "<div class='editButtons'>" +
                "<button class='editButton' id='" + allWages[i].id + "'>EDIT</button>&nbsp;" +
                "<button class='delButton' id='" + allWages[i].id + "'>DEL</button>" +
            "</div>" +
            "</div>" +

            "<div class='divTableCell hidden " + allWages[i].id + "'>" +
                "<input type='hidden' id='salaryId' name='salaryId' value='" + allWages[i].id + "' />" +
                "<input style='width: 90px;' type='text' id='salaryDate' name='salaryDate' value='" + allWages[i].salaryDate + "' />" +
            "</div>" +
            "<div class='divTableCell hidden " + allWages[i].id + "'>" +
                "<input style='width: 60px;' type='text' id='salary' name='salary' value='" + allWages[i].salary + "' />" +
            "</div>" +
            "<div class='divTableCell hidden " + allWages[i].id + "'>" +
                "<input style='width: 90px;' type='text' id='prepaidDate' name='prepaidDate' value='" + allWages[i].prepaidDate + "' />" +
            "</div>" +
            "<div class='divTableCell hidden " + allWages[i].id + "'>" +
                "<input style='width: 60px;' type='text' id='prepaid' name='prepaid' value='" + allWages[i].prepaid + "' />" +
            "</div>" +
            "<div class='divTableCell hidden " + allWages[i].id + "'>" +
                "<div class='salaryHiddenButtons'>" +
                    "<button class='saveButton' id='" + allWages[i].id + "'>✓</button><button class='cancelButton' id='" + allWages[i].id + "'>X</button>" +
                "</div>" +
            "</div>" +
        "</div>");
    }
}

function saveSalaryPrepaidFunc() {
    existSalaryId = $('#salaryId').val();
    existSalaryDate = $('#salaryDate').val();
    existSalaryAmount = $('#salary').val();
    existPrepaidDate = $('#prepaidDate').val();
    existPrepaidAmount = $('#prepaid').val();

    existWageData = JSON.stringify({id: existSalaryId, salaryDate: existSalaryDate, salary: existSalaryAmount, prepaidDate: existPrepaidDate, prepaid: existPrepaidAmount});
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

function deleteSalaryPrepaidFunc(i) {
    var id = i;
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
}

function editSalaryPrepaidFunc(i) {
    var id = i;

    $('.divTableCell').show();
    $('.divTableCell.hidden').hide();

    $('.divTableCell.' + id).hide();
    $('.divTableCell.hidden.' + id).show();
}

$(function() {
    $("#date").datepicker({
        dateFormat: "yy-mm-dd"
    });
    $("#salaryDate").datepicker({
        dateFormat: "yy-mm-dd"
    });
    $("#prepaidDate").datepicker({
        dateFormat: "yy-mm-dd"
    });
});