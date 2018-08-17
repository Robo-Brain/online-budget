function addWage(param) {

    var salaryDate = null;
    var salaryAmount = null;
    var prepaidDate = null;
    var prepaidAmount = null;

    if (param == 'pc') {
        if ($('#salaryPrepaid').val() == 'Salary') {
            salaryDate = $('#date').val();
            salaryAmount = $('#amount').val();
        } else if ($('#salaryPrepaid').val() == 'Prepaid') {
            prepaidDate = $('#date').val();
            prepaidAmount = $('#amount').val();
        }
    } else if (param == 'mobile') {
        if ($('#formSalaryPrepaid').val() == 'Salary') {
            salaryDate = $('#formDate').val();
            salaryAmount = $('#formAmount').val();
        } else if ($('#formSalaryPrepaid').val() == 'Prepaid') {
            prepaidDate = $('#formDate').val();
            prepaidAmount = $('#formAmount').val();
        }
    } else {
        alert('error')
    }

    wageData = JSON.stringify({salaryDate: salaryDate, salary: salaryAmount, prepaidDate: prepaidDate, prepaid: prepaidAmount});
console.log(wageData);

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/saveNewSalary",
        dataType : 'json',
        data : wageData,
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    })
}