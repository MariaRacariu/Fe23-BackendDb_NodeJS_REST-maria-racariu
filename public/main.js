async function handleStudentSearch(event) {
    // console.log("Hello World");

    event.preventDefault();

    // Get input data
    const inputData = document.querySelector("#studentInput").value;
    // console.log(inputData);

    // Checks if input data is a number
    const isID = !isNaN(inputData);

    // Put temporary path to id
    const endpoints = isID ? `http://localhost:9000/students/${inputData}` : `http://localhost:9000/student/name/${inputData}`;
    // console.log(endpoints);
}