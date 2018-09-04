$(function() {

var date = null;
var salaryPrepaid;
var active;

    months.forEach(function (item, i) {

        month = item.slice(0);
        month.sort(function(a,b) {
            return a.index - b.index;
        });

        date = item[i].date;

        $('#allMonthsTable').append(
            "<a id='" + i + "' class='monthDate'>" + date + "</a>" +
            "<div class='divTableRow head hide " + i + "'>" +
                "<div class='divTableCell " + i + "'>Name:</div>" +
                "<div class='divTableCell " + i + "'>Amount:</div>" +
                "<div class='divTableCell " + i + "'>Salary/Prepaid: </div>" +
                "<div class='divTableCell " + i + "'>Withdraw:</div>" +
            "</div>"
        );
        month.forEach(function (subitem) {
            salaryPrepaid = (subitem.salaryPrepaid == 'true') ? "ЗП" : "Аванс";
            active = (subitem.inactive == 'false') ? "active" : "inactive";
                $('#allMonthsTable').append(
                "<div class='divTableRow hide " + active + " " + i + " " + " hide'>" +
                    "<div class='divTableCell name " + i + "'>" + subitem.name + "</div>" +
                    "<div class='divTableCell amount " + i + "'>" + subitem.monthAmount + " / " + subitem.amount + "</div>" +
                    "<div class='divTableCell salaryPrepaid " + subitem.salaryPrepaid + " " + i + "'>" + salaryPrepaid + "</div >" +
                    "<div class='divTableCell currentMonth " + subitem.withdraw + " " + i + "'></div>" +
                "</div>"
            )
        });
    });
});

$(function() {
    $('.hide').toggleClass('hidden');
    $('.monthDate').click(function () {
        var id = $(this).attr('id');
        $('.hide.'+id).toggleClass('hidden');
    });
});