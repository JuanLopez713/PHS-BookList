//Created by Juan Lopez 2017
//PARSE THE CRV
//(function(){
//    alert("Make note of the course ids found on your class schedules to use this tool.");
//})();
$(function () {
    var results = Papa.parse("BookList2017.csv?Version=1.4", {
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
        var course = tr[i].getElementsByTagName("td")[8];
        var id;
        var notes = tr[i].getElementsByTagName("td")[9];
        if (td) {
            id = course.innerHTML;
            var str = td.innerHTML;
            console.log(id);
            td.innerHTML = '<a href="https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dstripbooks&field-keywords=' + str + '">' + str + '</a>';
            //IF SPANISH I
            if (id == 10450) {
                td.innerHTML = '<a href="http://vistahigherlearning.com/students/store/spanish-programs/descubre-c2017-level-1.html">' + str + '</a>';
                notes.innerHTML ='PURCHASE FIRST PACKAGE LISTED on site = 9781680045239 ' + '<a href="http://vistahigherlearning.com/students/store/spanish-programs/descubre-c2017-level-1.html">' + 'http://bit.ly/2r4eu5h' + '</a>';
            }
            //IF SPANISH II OR HONORS SPANISH II
            else if (id == 10460 || id == 10462) {
                td.innerHTML = '<a href="http://vistahigherlearning.com/students/store/spanish-programs/descubre-c2017-level-2.html">' + str + '</a>';
                notes.innerHTML ='MUST PURCHASE NEW SUPERSITE CODE FROM ' + '<a href="http://vistahigherlearning.com/students/store/spanish-programs/descubre-c2017-level-2.html">' + 'http://bit.ly/2r4nsPH' + '</a>';
            }
            //IF SPANISH III OR HONORS SPANISH III
            else if (id == 10470 || id == 10472) {
                td.innerHTML = '<a href="http://vistahigherlearning.com/students/store/spanish-programs/descubre-c2017-level-3.html">' + str + '</a>';
                notes.innerHTML ='MUST PURCHASE NEW SUPERSITE CODE FROM ' + '<a href="http://vistahigherlearning.com/students/store/spanish-programs/descubre-c2017-level-3.html">' + 'http://bit.ly/2qn6Txq' + '</a>';
            }
            //IF AP SPANISH
            else if (id == 10480) {
                td.innerHTML = '<a href="http://vistahigherlearning.com/students/store/spanish-programs/temas-y-contextos.html">' + str + '</a>';
                notes.innerHTML ='MUST PURCHASE NEW SUPERSITE CODE FROM ' + '<a href="http://vistahigherlearning.com/students/store/spanish-programs/temas-y-contextos.html">' + 'http://bit.ly/1sszW0H' + '</a>';
            }
        }
        //         if(id = 10450||"10460"||"10462"||"10470"||"10472"){
        //            notes.innerHTML = "MUST PURCHASE A NEW SUPERSITE CODE FROM" + '<a href="http://vistahigherlearning.com/students/store/spanish-programs.html">'+ "THIS LINK" +'</a>';
        //            
        //        }
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
    var columns = ["Grade", "Department", "Course", "ISBN", "Author", "Title", "Publisher", "Edition", "Course ID", "Notes"];
    var myBooks = [];
    myBooks.push(columns);
    $("#books tr").each(function () {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function () {
                arrayOfThisRow.push($(this).text());
            });
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
            }
        }
        var links = [];
        doc.autoTable(myBooks[0], rowsd, {
            styles: {
                fontSize: 10
                , overflow: 'linebreak'
                , columnWidth: 27
            }
            , headerStyles: {
                fillColor: [0, 80, 58]
            }
            //                    , drawCell: function (cell, rowsd) {
            //                        if (rowsd.column.dataKey === 3) {
            //                            links.push({
            //                                x: cell.textPos.x
            //                                , y: cell.textPos.y
            //                            });
            //                        }
            //                    }
            //                    , addPageContent: function () {
            //                        console.log("Row length:" + rowsd.length);
            //                        console.log("Link length:" + links.length);
            //                        for (var i = 0; i < rowsd.length; i++) {
            //                            if (rowsd[i][3]) {
            //                                console.log(i + "THE ISBN IS: " + rowsd[i][3]);
            //                                var isbn = rowsd[i][3];
            //                                if(links.length <= 10){
            //                                doc.textWithLink('Buy Here', links[i].x, links[i].y + 10, {
            //                                    url: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + isbn
            //                                });
            //                                }
            //                                else if(links.length>=10){
            //                                    doc.textWithLink('Buy Here', links[i-9].x, links[i-9].y + 10, {
            //                                    url: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + isbn
            //                                }); 
            //                                }
            //                            }else{
            //                                console.log(i + "NO ISBN FOR: " + rowsd[i][8]);
            //                            }
            //                        }
            //                    }
        });
        doc.save('table.pdf');
    }
});
//10830 10410 10512 10101 10210 10332 10620