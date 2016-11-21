/**
 * Created by Tastum on 06/11/2016.
 */

$(document).ready(function () {

    SDK.Book.getAll(function (err, data) {
        if (err) throw err;

        // Dekrypterer den modtagede data fra /book
        var decrypted = encryptDecrypt(data);
        //Da dataen kommer som en String, så skal det parses, så det kan læses.
        var books = JSON.parse(decrypted);

        var $booksTableBody = $('#booksTableBody');
        books.forEach(function (book, i) {

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

    });
});
