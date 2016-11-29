/**
 * Created by Tastum on 06/11/2016.
 */
$(document).ready(function() {

    var currentUser = SDK.User.current();

    var $jumbotron = $('#jumbo');

    // $("#currentUser").text(currentUser.firstName +  " " + currentUser.lastName);

    // $('#bs-example-navbar-collapse-1 ul').append('<li id="currentUser"><a>' + currentUser.firstName + '</a></li>');

    $jumbotron.append("<h1>" + currentUser.firstName + " " + currentUser.lastName + "</h1>");

    // var $booksTableBody = $('#booksTableBody');
    // books.forEach(function (book, i) {
    //
    //     $booksTableBody.append(
    //         "<tr>" +
    //         "<td>" + book.title + "</td>" +
    //         "<td>" + book.author + "</td>" +
    //         "<td>" + book.publisher  + "</td>" +
    //         "<td>" + book.version  + "</td>" +
    //         "<td>" + book.ISBN  + "</td>" +
    //         "<td>" + book.priceAB  + "</td>" +
    //         "<td>" + book.priceSAXO  + "</td>" +
    //         "<td>" + book.priceCDON  + "</td>" +
    //         "</tr>");
    // });


});

