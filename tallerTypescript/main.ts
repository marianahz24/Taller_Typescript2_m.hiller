import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnFilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const nombreEstudiante: HTMLElement = document.getElementById("nombre-estudiante")!;
const minValue = 0;
const maxValue = 99999999;

btnfilterByName.onclick = () => applyFilterByName();
btnFilterByCredits.onclick = () => applyFilterByCredits();

renderStudentInfo(dataStudents[0]);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderStudentInfo(estudiante: Student): void {
  document.getElementById("nombre-estudiante")!.innerHTML = estudiante.name;
  document.getElementById("codigo-estudiante")!.innerHTML = `${estudiante.codigo}`;
  document.getElementById("cedula-estudiante")!.innerHTML = `${estudiante.cedula}`;
  document.getElementById("edad-estudiante")!.innerHTML = `${estudiante.edad} años`;
  document.getElementById("direccion-estudiante")!.innerHTML = estudiante.direccion;
  document.getElementById("telefono-estudiante")!.innerHTML = `${estudiante.telefono}`;
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() {
  let txtMin = (<HTMLInputElement>document.getElementById("input-min-credit")!).value;
  let txtMax = (<HTMLInputElement>document.getElementById("input-max-credit")!).value;
  let min = (txtMin == null || txtMin == '') ? minValue : parseInt(txtMin);
  let max = (txtMax == null || txtMax == '') ? maxValue : parseInt(txtMax);
  if (max < min)
    alert("El máximo no puede ser menor que el mínimo.");
  else if (max < 0 || min < 0)
    alert("Los valores del rango deben ser mayores o iguales a cero.");
  else {
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}

function searchCourseByCredits(min: number, max: number, courses: Course[]) {
  return (min == minValue && max == maxValue) ? dataCourses : courses.filter(c => (c.credits >= min && c.credits <= max));
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);

    }
  }
}