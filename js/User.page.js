/**
 * Created by Tastum on 20/11/2016.
 */

$(document).ready(function () {

    //Denne metode er til for at vise alle pensumlister.
    SDK.Curriculum.getAll(function (err, data) {
        if (err) throw err;

        // Dekrypterer den modtagede data fra /curriculum
        var decrypted = encryptDecrypt(data);
        //Da dataen kommer som en String, så skal det parses, så det kan læses.
        var curriculums = JSON.parse(decrypted);

        var $curriculumsTableBody = $('#curriculumsTableBody');

        //Tilføjer hvert semester til curriculumTable med en .append metode
        curriculums.forEach(function (curriculum) {

            $curriculumsTableBody.append(
                "<tr>" +
                //Denne er hidden, da der ikke er nogen grund til at vise curriculumID for brugeren, men det skal stadig bruges
                //i systemet til at finde de rigtige bøger
                "<td class='hidden curriculumID'>" + curriculum.curriculumID + "</td>" +
                "<td>" + curriculum.school + "</td>" +
                "<td>" + curriculum.education + "</td>" +
                "<td>" + curriculum.semester + "</td>" +
                "</tr>");
        });
        //Kører nedenstående metode, der tager ID'et fra den valgte pensumliste.
        curriculumsTableHandler();

    });

    //Efter funktionen har fået ID'et på pensumlisten bliver dette sat ind i CurriculumBooks metoden, der skal finde de rette bøger
    function curriculumsTableHandler() {
        var $curriculumsTableRows = $("#curriculumsTableBody tr");
        $curriculumsTableRows.each(function() {
            $(this).on("click",function () {

                //De fundne bøger bliver herefter returneret igen som semesterBooks og skal bruges i næste metode
                SDK.Curriculum.getCurriculumBooks($(this).find(".curriculumID").html(), semesterBooks);

            });
        });
    }

    //Denne metode skal sørge for at indsætte de korrekte bøger i en tabel.
    function semesterBooks(failHandler, data) {

        //Dekrypterer dataen fra serveren
        var booksDecrypted = encryptDecrypt(data);

        //Da dataen kommer som en String, så skal det parses, så det kan læses.
        var books = JSON.parse(booksDecrypted);

        var $booksTableBody = $('#booksTableBody');

        //clearer table, hvis der er eksisterende data.
        removeContent();

        books.forEach(function (book) {

            //Appender alle bøgerne til tabellen.
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

    //Denne metode tømmer tabellen for data. Dette bruges hvis der klikkes på flere pensumlister.
    //Sørger for at alle bøgerne ikke bliver lagt oven i hinanden.
    function removeContent() {
        $('#booksTableBody').empty();
    }
});