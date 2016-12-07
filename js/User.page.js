/**
 * Created by Tastum on 20/11/2016.
 */

$(document).ready(function () {

    SDK.Curriculum.getAll(function (err, data) {
        if (err) throw err;

        // Dekrypterer den modtagede data fra /book
        var decrypted = encryptDecrypt(data);
        //Da dataen kommer som en String, så skal det parses, så det kan læses.
        var curriculums = JSON.parse(decrypted);

        var $curriculumsTableBody = $('#curriculumsTableBody');

        curriculums.forEach(function (curriculum) {

            $curriculumsTableBody.append(
                "<tr>" +
                "<td class='hidden curriculumID'>" + curriculum.curriculumID + "</td>" +
                "<td>" + curriculum.school + "</td>" +
                "<td>" + curriculum.education + "</td>" +
                "<td>" + curriculum.semester + "</td>" +
                "</tr>");
        });

        curriculumsTableHandler();

    });

    function curriculumsTableHandler() {
        var $curriculumsTableRows = $("#curriculumsTableBody tr");
        $curriculumsTableRows.each(function() {
            $(this).on("click",function () {

                SDK.Curriculum.getCurriculumBooks($(this).find(".curriculumID").html(), semesterBooks);

            });
        });
    }

    function semesterBooks(failHandler, data) {

        var booksDecrypted = encryptDecrypt(data);

        //Da dataen kommer som en String, så skal det parses, så det kan læses.
        var books = JSON.parse(booksDecrypted);

        var $booksTableBody = $('#booksTableBody');

        removeContent();

        books.forEach(function (book) {

            $booksTableBody.append(
                "<tr>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" + book.publisher + "</td>" +
                "<td>" + book.version + "</td>" +
                "<td>" + book.ISBN + "</td>" +
                "<td>" + book.priceAB + "</td>" +
                "<td>" + book.priceSAXO + "</td>" +
                "<td>" + book.priceCDON + "</td>" +
                "</tr>");
        });
    }

    function removeContent() {
        $('#booksTableBody').empty();
    }
});