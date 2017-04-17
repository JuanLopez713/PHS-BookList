//PARSE THE CRV
$(function () {

    var results = Papa.parse("BookList2016.csv", {
        header: true,
        download: true,
        complete: function (results) {
            console.log("Remote file parsed!", results.data);
            $.each(results.data, function (i, el) {
                var row = $("<tr/>");
                row.append($("<td/>").text());
                $.each(el, function (j, cell) {
                    row.append($("<td/>").text(cell));
                });
                $("#books tbody").append(row);
            });
            var str = $('#books td:nth-child(4)').text();
            str.prepend(("https://www.google.com/#q=").text());
            $('#books td:nth-child(4)').append("test");
        }
    });









});


function searchTable() {

    var input, filter, table, i, x, y, terms, td, tr, found;

    input = document.getElementById("emp_search");
    filter = input.value.toUpperCase();
    terms = filter.split(" ");
    table = document.getElementById("books");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        for (x = 0; x < 9; x++) {
            found = false;
            td = tr[i].getElementsByTagName("td")[x];
            if (td) {
                for (y = 0; y < terms.length; y++) {
                    if (td.innerHTML.toUpperCase().indexOf(terms[y]) > -1) {
                        found = true;
                    }

                }
            }

        }
        if(found){
            tr[i].style.display="";
        }else{
            tr[i].style.display="none";
        }
        tr[0].style.display="";
    }

}
