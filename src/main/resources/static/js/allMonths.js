$(function() {

var date = null;

console.log(notes);
    months.forEach(function (item, i) {

        month = item.slice(0);
        month.sort(function(a,b) {
            return a.index - b.index;
        });

        var dateOptions = { year: 'numeric', month: 'long' };
        var date = new Date(item[i].date).toLocaleDateString("en-US", dateOptions);

        $('#allMonthsTable').append(
                // "<a id='" + i + "' class='monthDate'>" + date + "</a>" +
                // "<div class='divTableRow head hide " + i + "'>" +
                //     "<div class='divTableCell " + i + "'>Name:</div>" +
                //     "<div class='divTableCell " + i + "'>Amount:</div>" +
                //     "<div class='divTableCell " + i + "'>Salary/Prepaid: </div>" +
                //     "<div class='divTableCell " + i + "'>Withdraw:</div>" +
            "<div class='wrap " + i + "'><div id='" + i + "' class='monthDate'>"
                + date
            + "</div></div>"
        );
        month.forEach(function (subitem, n) {
            var salaryPrepaid = (subitem.salaryPrepaid) ? "ЗП" : "Аванс";
            var active = (!subitem.inactive) ? "active" : "inactive";
                $('.wrap.'+i).append(
                "<div class='divTableRow hide " + active + " " + i + "'>" +
                    "<div id='" + subitem.id + "' class='divTableCell'>" + subitem.name + "</div>" +
                    "<div class='divTableCell amount " + n + "'>" + subitem.monthAmount + " / " + subitem.amount + "</div>" +
                    "<div class='divTableCell salaryPrepaid " + n + "'>" + salaryPrepaid + "</div >" +
                    "<div class='divTableCell allMonths " + subitem.withdraw + " " + n + "'></div>" +
                "</div>"
            );
                // if (subitem.monthAmount < subitem.amount ) {
                //     $('.amount.' + n).addClass();
                // }
        });
    });
});

$(function() {
    notes.forEach(function (item) {
        if (item.stuckSpendId != null) {
            var id = '#' + item.stuckSpendId;
            $(id).toggleClass('stuckSpend');
            $(id).attr("title", item.text);
        }
    });

    $('.stuckSpend').tooltip({
        position: {
            my: "left-10 top",
            at: "right top"
        },
        tooltipClass: "allMonthNote"
    });

});

$(function() {
    $('.wrap').each(function(index) {
        var res = $(this).find('.stuckSpend').length;
        if(res) {
            var cls = '.wrap.' + index;
            $(cls).prepend(
              "<div class='marker'>&nbsp;" + res + "</div>"
            );
            // $(cls).addClass('markered');
        }
    });

});

$(function() {
    $('.hide').toggleClass('hidden');
    $('.monthDate').click(function () {
        var id = $(this).attr('id');
        $('.hide.'+id).toggleClass('hidden');
    });
});