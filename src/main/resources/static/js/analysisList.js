function appendAnalysisList() {
    for (i = 0; i < analysis.length; i++) {
        $("#analysisListTable").append(
            "<div class='divTableRow " + analysis[i].id + "'>" +

                "<input type='hidden' id='id' name='id' value='" + analysis[i].id + "' />" +
                "<div style='width: 57%' class='divTableCell left " + analysis[i].id + "'>" + analysis[i].name + "</div>" +
                "<div class='divTableCell " + analysis[i].id + "'>" + analysis[i].price + "<span style='font-size: 12px;' class='priceDivider" + analysis[i].id + "'></span>" + "</div>" +
                "<div class='divTableCell " + analysis[i].id + "'>" + analysis[i].persons + "</div>" +
                "<div class='divTableCell " + analysis[i].id + "'>" +
                    "<div class='editButtons'>" +
                    "<button class='editButton' id='" + analysis[i].id + "'>EDIT</button>&nbsp;" +
                    "<button class='delButton' id='" + analysis[i].id + "'>DEL</button>" +
                    "</div>" +
                "</div>" +

                "<div class='divTableCell hidden " + analysis[i].id + "'>" +
                    "<input type='hidden' id='analysisId' name='analysisId' value='" + analysis[i].id + "' />" +
                    "<textarea style='width: 100%; resize: none;' rows='3' id='analysisName" + analysis[i].id + "' name='analysisName' >" + analysis[i].name + "</textarea>" +
                "</div>" +
                "<div class='divTableCell hidden " + analysis[i].id + "'>" +
                    "<input style='width: 90px;' type='text' id='analysisPrice" + analysis[i].id + "' name='analysisPrice' value='" + analysis[i].price + "' />" +
                "</div>" +
                "<div class='divTableCell hidden " + analysis[i].id + "'>" +
                    "<label class='switch'>" +
                    "<input type='checkbox' id='analysisPersons" + analysis[i].id + "' class='persons" + analysis[i].persons +"' name='analysisPersons' />" +
                        "<span class='slider persons'></span>" +
                    "</label>" +
                "</div>" +
                "<div class='divTableCell hidden " + analysis[i].id + "'>" +
                    "<div class='salaryHiddenButtons'>" +
                        "<button class='saveButton' id='" + analysis[i].id + "'>✓</button><button class='cancelButton' id='" + analysis[i].id + "'>X</button>" +
                    "</div>" +
                "</div>" +

            "</div>");

            $('.persons1').prop('unchecked', false);
            $('.persons2').prop('checked', true);

        if (analysis[i].persons == 2) {
                $('.priceDivider' + analysis[i].id).append('<br />(' + (analysis[i].price / 2) + ')' );
        }

    }
}
$(function() {
    $(".editButton").click(function (e) {
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
        $(".divTableRow." + id).fadeOut("250");
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "post",
            url: "/delAnalysisFromList",
            data : id,
            success: $(document).ajaxStop(function(){
                window.location.reload();
            })
        });
    });
});
$(function() {
    $(".saveButton").click(function (s) {
        s.preventDefault();
        var analysisId = $(this).attr('id');
        var analysisName = $('#analysisName' + analysisId).val();
        var analysisPrice = $('#analysisPrice' + analysisId).val();
        var analysisPersons = $('#analysisPersons' + analysisId).is(':checked');

        if (analysisPersons == true) {
            analysisPersons = 2;
        } else {
            analysisPersons = 1;
        }

        existAnalysisListItem = JSON.stringify({id: analysisId, name: analysisName, price: analysisPrice, persons: analysisPersons});

        console.log(existAnalysisListItem);

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "post",
            url: "/saveExistAnalysisToList",
            dataType : 'json',
            data : existAnalysisListItem,
            success: $(document).ajaxStop(function(){
                window.location.reload();
            })
        })
    });
});
$(function() {
    $(".cancelButton").click(function(c) {
        c.preventDefault();
        var id = $(this).attr('id');
        $('.divTableCell.' + id).show();
        $('.divTableCell.hidden.' + id).hide();
    });
});
$(function() {
    $("#addAnalysis").click(function (x) {
        x.preventDefault();
        var name = $('#name').val();
        var price = $('#price').val();
        var persons = $('#persons').is(':checked');

        if (name == '') {
            name = null;
        }

        if (persons == true) {
            persons = 2;
        } else {
            persons = 1;
        }

        result = JSON.stringify({name: name, price: price, persons: persons});
        console.log(result);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "post",
            url: "/addAnalysis",
            data : result,
            success: $(document).ajaxStop(function(){
                window.location.reload();
            })
        });
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
});