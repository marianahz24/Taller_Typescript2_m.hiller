import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnFilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var nombreEstudiante = document.getElementById("nombre-estudiante");
var minValue = 0;
var maxValue = 99999999;
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnFilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderStudentInfo(dataStudents[0]);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderStudentInfo(estudiante) {
    document.getElementById("nombre-estudiante").innerHTML = estudiante.name;
    document.getElementById("codigo-estudiante").innerHTML = "" + estudiante.codigo;
    document.getElementById("cedula-estudiante").innerHTML = "" + estudiante.cedula;
    document.getElementById("edad-estudiante").innerHTML = estudiante.edad + " a\u00F1os";
    document.getElementById("direccion-estudiante").innerHTML = estudiante.direccion;
    document.getElementById("telefono-estudiante").innerHTML = "" + estudiante.telefono;
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var txtMin = document.getElementById("input-min-credit").value;
    var txtMax = document.getElementById("input-max-credit").value;
    var min = (txtMin == null || txtMin == '') ? minValue : parseInt(txtMin);
    var max = (txtMax == null || txtMax == '') ? maxValue : parseInt(txtMax);
    if (max < min)
        alert("El máximo no puede ser menor que el mínimo.");
    else if (max < 0 || min < 0)
        alert("Los valores del rango deben ser mayores o iguales a cero.");
    else {
        clearCoursesInTable();
        var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
        renderCoursesInTable(coursesFiltered);
    }
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(min, max, courses) {
    return (min == minValue && max == maxValue) ? dataCourses : courses.filter(function (c) { return (c.credits >= min && c.credits <= max); });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
