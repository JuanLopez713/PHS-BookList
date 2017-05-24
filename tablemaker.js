//PARSE THE CRV
//(function(){
//    alert("Make note of the course ids found on your class schedules to use this tool.");
//})();
$(function () {
    var results = Papa.parse("BookList2017.csv", {
        header: true
        , download: true
        , complete: function (results) {
            //console.log("Remote file parsed!", results.data);
            $.each(results.data, function (i, el) {
                var row = $("<tr/>");
                row.append($("<td/>").text());
                $.each(el, function (j, cell) {
                    row.append($("<td/>").text(cell));
                });
                $("#books tbody").append(row);
            });
            urlEncoder();
        }
    });
});

function urlEncoder() {
    console.log("encoder called");
    var table = document.getElementById("books");
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            var str = td.innerHTML;
            td.innerHTML = '<a target="_blank" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + str + '">' + str + '</a>';
        }
    }
}
var tr, td;
var column, row;
//SEARCH TABLE FUNCTION
function searchTable() {
    var input, filter, table, i, x, y, terms, found;
    input = document.getElementById("emp_search");
    filter = input.value.toUpperCase();
    terms = filter.split(" ");
    table = document.getElementById("books");
    tr = table.getElementsByTagName("tr");
    //console.log("CURRENT SEARCH TERMS: " + terms);
    for (i = 0; i < tr.length; i++) {
        found = false;
        for (x = 0; x < 9; x++) {
            td = tr[i].getElementsByTagName("td")[8];
            if (td) {
                for (y = 0; y < terms.length; y++) {
                    if (terms[y]) {
                        if (td.innerHTML.toUpperCase().indexOf(terms[y]) > -1) {
                            found = true;
                        }
                    }
                    else {}
                }
            }
        }
        if (found) {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
        tr[0].style.display = "";
    }
}
//SAVE PDF FUNCTION
var doc = new jsPDF('landscape');
$('#printbutt').click(function () {
    var columns = ["Grade", "Department", "Course", "ISBN", "Author", "Title", "Publisher", "Edition", "Course Code", "Notes"];
    var myBooks = [];
    myBooks.push(columns);
    $("#books tr").each(function () {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function () {
                arrayOfThisRow.push($(this).text());
            });
            //            var isbn = arrayOfThisRow[3];
            //           
            //            arrayOfThisRow[3] =  doc.textWithLink(isbn, { url: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + isbn });
            myBooks.push(arrayOfThisRow);
        }
    });
    var rowsd = [];
    var input = document.getElementById("emp_search");
    filter = input.value;
    if (!filter) {
        alert("Please Type your Course IDs into the Search Bar");
    }
    else {
        for (var i = 1; i < tr.length; i++) {
            if (tr[i].style.display == "") {
                rowsd.push(myBooks[i]);
                //console.log("concatenating row: " + i);
            }
        }
        //        for (var x = 0; x < rowsd.length; x++) {
        //            var isbn = rowsd[x][3].text;
        //            console.log(isbn);
        //            rowsd[x][3] = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + rowsd[x][3];
        //        }
        var links = [];
        doc.autoTable(myBooks[0], rowsd, {
            theme: 'striped'
            , styles: {
                overflow: 'linebreak'
                , columnWidth: 27
            }
//            , drawCell: function (cell, opts) {
//                if (opts.column.dataKey === 3) {
//                    
//                        links.push({
//                            x: cell.textPos.x
//                            , y: cell.textPos.y
//                        });
//                        //console.log("Adding Cell Position x: " + cell.textPos.x + " y: " + cell.textPos.y);
//                    
//                }
//            }
//            , addPageContent: function () {
//                console.log("Row length:" + rowsd.length);
//                console.log("Link length:" + links.length);
//                if (links.length == 10) {
//                    for (var i = 0; i < links.length; i++) {
//                        if (rowsd[i][3]) {
//                            console.log(i + "THE ISBN IS: " + rowsd[i][3]);
//                            var isbn = rowsd[i][3];
//                            doc.textWithLink('Buy Here', links[i].x, links[i].y + 10, {
//                                url: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + isbn
//                            });
//                        }
//                        else {
//                            console.log("No isbn number for: " + rowsd[i][8]);
//                            console.log("This is the problem row: " + rowsd[i]);
//                        }
//                    }
//                }
//                else if (links.length > 10) {
//                    for (var i = 10; i < links.length - 1; i++) {
//                        if (rowsd[i][3]) {
//                            console.log(i + "THE ISBN IS: " + rowsd[i][3]);
//                            var isbn = rowsd[i][3];
//                            doc.textWithLink('Buy Here', links.x, links[i].y + 20, {
//                                url: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + isbn
//                            });
//                        }
//                        else {
//                            console.log(i + "No isbn number for: " + rowsd[i][8]);
//                            console.log("This is the problem row: " + rowsd[i]);
//                        }
//                    }
//                }
//            }
        });
        doc.save('table.pdf');
    }
});
//10830 10410 10512 10101 10210 10332 10620