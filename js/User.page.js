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

        var $curriculumTableBody = $('#curriculumTableBody');

        curriculums.forEach(function (curriculum, i) {

            $curriculumTableBody.append(
                "<tr>" +
                "<td>" + curriculum.curriculumID + "</td>" +
                "<td>" + curriculum.school + "</td>" +
                "<td>" + curriculum.education + "</td>" +
                "<td>" + curriculum.semester + "</td>" +
                "</tr>");
        });

    });
});