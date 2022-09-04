import { useEffect, useState } from "react";
import Api from "../../Services/Api";

const CoursesPage = ({user}) => {

    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState('');
    const [examDescription, setExamDescrition] = useState('');
    const [showExamInput, setShowExamInput] = useState(false);
    const [courseId, setCourseId] = useState(null);

    const fetchData = async () => {
        const response = await Api.getCoursesAction();
        console.log(response);
        setCourses(response.records);
    }

    const addExam = async (courseId) => {
        setShowExamInput(true);
        setCourseId(courseId);
    }

    const setPassExamStatus = async (examId) => {
        const response = await Api.setPassExamStatus({examId: examId});
        console.log(response);
        fetchData();
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const response = await Api.addCourseAction({Title: title});
        console.log(response);
        fetchData();
    }

    const onSubmitExam = async (ev) => {
        ev.preventDefault();
        const response = await Api.addCourseExamAction({description: examDescription, courseId: courseId, estimatedDate: "", screenshotFile: ""});
        console.log(response);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h2> Courses </h2>

            <form onSubmit={onSubmit}>
                <label>
                    Title:
                    <input name="title" onChange={e => setTitle(e.target.value)} value={title}></input>
                    <input type="submit" value="Add"></input>
                </label>
            </form>
            {showExamInput && (
                <form onSubmit={onSubmitExam}>
                    <label>
                        Exam:
                        <input name="examDescription" onChange={e => setExamDescrition(e.target.value)} value={examDescription}></input>
                        <input type="submit" value="Add"></input>
                    </label>
                </form>
            )}
            <ul>
            {courses.length > 0 && courses.map(course => (
                <li key={course.id}>
                    {course.title} <button onClick={() => addExam(course.id)}>Add Exam</button>
                    <ul>
                        {course.exams.length > 0 ? course.exams.map((exam) => (
                            <li key={exam.id}>
                                {exam.description} - {exam.isPassed ? 'Passed' : 'Not passed'} <button onClick={() => setPassExamStatus(exam.id, exam.isPassed)}>Set Pass</button>
                            </li>
                        )) : (
                            <>
                                Brak
                            </>
                        )}
                    </ul>
                </li>
            ))}
            </ul>
        </>
    )
}

export default CoursesPage;