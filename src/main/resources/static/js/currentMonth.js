var cashSalary = 0;
var cashlessSalary = 0;
var cashPrepaid = 0;
var cashlessPrepaid = 0;

var alreadyCashSalary = 0;
var alreadyCashlessSalary = 0;
var alreadyCashPrepaid = 0;
var alreadyCashlessPrepaid = 0;

function appendCurrentDateTable() {

    curMonth = currentMonth.slice(0);
    curMonth.sort(function(a, b) {
        return a.index - b.index;
    });

    for (i = 0; i < curMonth.length; i++) {
        var month = curMonth[i];
        var salaryPrepaid = (month.salaryPrepaid) ? "salary" : "prepaid";


        $("#currentDate").html(month.date);

        // (month.salaryPrepaid && month.withdraw) ? cashSalary += +month.amount : cashSalary;
        // (month.salaryPrepaid && !month.withdraw) ? cashlessSalary += +month.amount : cashlessSalary;
        // (!month.salaryPrepaid && month.withdraw) ? cashPrepaid += +month.amount : cashPrepaid;
        // (!month.salaryPrepaid && !month.withdraw) ? cashlessPrepaid += +month.amount : cashlessPrepaid;
        if (month.salaryPrepaid && month.withdraw) {
            cashSalary += +month.amount;
            alreadyCashSalary += +month.monthAmount;
        }
        if (month.salaryPrepaid && !month.withdraw) {
            cashlessSalary += +month.amount;
            alreadyCashlessSalary += +month.monthAmount;
        }
        if (!month.salaryPrepaid && month.withdraw) {
            cashPrepaid += +month.amount;
            alreadyCashPrepaid += +month.monthAmount;
        }
        if (!month.salaryPrepaid && !month.withdraw) {
            cashlessPrepaid += +month.amount;
            alreadyCashlessPrepaid += +month.monthAmount;
        }


        $("#currentMonth").append(
            "<div class='divTableRow " + i + " " + month.salaryPrepaid + ' ' + salaryPrepaid + "'>" +
                "<div class='divTableCell left name'>" + month.name +
                    "<input type='hidden' class='id " + month.id + "' id='id' name='id' value='" + month.id + "' />" +
                    "<input type='hidden' class='date " + month.id + "' id='date' name='date' value='" + month.date + "' />" +
                    "<input type='hidden' id='spendName' name='spendName' value='" + month.spendName + "' />" +
                    "<input type='hidden' class='spendId " + month.id + "' id='spendId' name='spendId' value='" + month.spendId + "' />" +
                "</div>" +
                "<div class='divTableCell left amount'>" +
                    "<input type='text' class='amount " + month.id + "' id='amount" + i + "' name='amount' value='" + month.monthAmount + "' autocomplete='off' />&nbsp;"
                    + "<button class='fillButton " + month.salaryPrepaid + "' value='" + month.amount + "' id='" + i + "'>&nbsp;<<<&nbsp;</button>&nbsp;"
                    + "<button class='applyButton " + i + "' value='" + month.amount + "'>Apply</button>"
                    + "<span class='TMP " + month.salaryPrepaid +"'>" + parseInt(month.amount).toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) + "</span>"+
                "</div>" +
                "<div class='divTableCell " + i + " currentMonth " + month.withdraw + "'>" +
                "</div>" +
            "</div>");

        if (parseInt(month.amount) > parseInt(month.monthAmount)) {
            $(".amount." + month.id).toggleClass('notEnough');
        }

    }
}

function appendResultTable() {
    $(".resultTable").append( // amount of expenses from prepaid and salary
        "<div class='divTableRow salary'>"
            + "<div class='divTableCell currentMonth true'></div>"
            + "<div class='divTableCell'>"
                + cashSalary.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) //
                + "<span>" + (cashSalary-alreadyCashSalary) + "</span></div>"
            + "<div class='divTableCell currentMonth false'></div>"
            + "<div class='divTableCell'>"
                + cashlessSalary.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) //
        + "<span>" + (cashlessSalary-alreadyCashlessSalary) + "</span></div></div>"
        + "<div class='divTableRow'>"
            + "<div class='divTableCell nope'></div><div class='divTableCell nope'></div><div class='divTableCell nope'></div>"
            + "<div class='divTableCell salary'>"
            + sum(cashSalary, cashlessSalary).toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) //
        + "</div></div>"
        + "<div class='divTableRow prepaid'>"
            + "<div class='divTableCell currentMonth true'></div>"
            + "<div class='divTableCell'>"
            + cashPrepaid.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) //
            + "<span>" + (cashPrepaid-alreadyCashPrepaid) + "</span></div>"
            + "<div class='divTableCell currentMonth false'></div>"
            + "<div class='divTableCell'>"
            + cashlessPrepaid.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) //
        + "<span>" + (cashlessPrepaid-alreadyCashlessPrepaid) + "</span></div></div>"
        + "<div class='divTableRow'>"
            + "<div class='divTableCell nope'></div><div class='divTableCell nope'></div><div class='divTableCell nope'></div>"
        + "<div class='divTableCell prepaid'>"
            + sum(cashPrepaid, cashlessPrepaid).toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) //
        + "</div></div>"
    );
}

function sum(x, y) {
    return parseInt(x) + parseInt(y);
}
