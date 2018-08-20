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
                "<input type='hidden' id='salaryId' name='salaryId' value='" + allWages[i].id + "' />" +
                "<input style='width: 90px;' type='text' id='salaryDateInput' name='salaryDateInput' value='" + allWages[i].salaryDate + "' />" +
            "</div>" +
            "<div class='divTableCell hidden salary " + allWages[i].id + "'>" +
                "<input style='width: 60px;' type='text' id='salaryInput' name='salaryInput' value='" + allWages[i].salary + "' />" +
            "</div>" +
            "<div class='divTableCell hidden prepaidDate " + allWages[i].id + "'>" +
                "<input style='width: 90px;' type='text' id='prepaidDateInput' name='prepaidDateInput' value='" + allWages[i].prepaidDate + "' />" +
            "</div>" +
            "<div class='divTableCell hidden prepaid " + allWages[i].id + "'>" +
                "<input style='width: 60px;' type='text' id='prepaidInput' name='prepaidInput' value='" + allWages[i].prepaid + "' />" +
            "</div>" +
            "<div class='divTableCell hidden salaryEditButtons " + allWages[i].id + "'>" +
                "<div class='salaryHiddenButtons'>" +
                    "<button class='saveButton' id='" + allWages[i].id + "'>✓</button><button class='cancelButton' id='" + allWages[i].id + "'>X</button>" +
                "</div>" +
            "</div>" +
        "</div>");
    }
}

function saveSalaryPrepaidFunc() {
    existSalaryId = $('#salaryIdInput').val();
    existSalaryDate = $('#salaryDateInput').val();
    existSalaryAmount = $('#salaryInput').val();
    existPrepaidDate = $('#prepaidDateInput').val();
    existPrepaidAmount = $('#prepaidInput').val();

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
    $("#formDate").datepicker({
        dateFormat: "yy-mm-dd"
    });
    $("#salaryDateInput").datepicker({
        dateFormat: "yy-mm-dd"
    });
    $("#prepaidDateInput").datepicker({
        dateFormat: "yy-mm-dd"
    });
});