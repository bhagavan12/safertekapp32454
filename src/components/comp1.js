import React, { useState } from 'react';
import './comp1.css';
const students = [
    { id: 1, name: 'sai', ticketNumber: 'A001', ratingGrade: 4.6, examGrade: 3.5, comments: 'Good effort' },
    { id: 2, name: 'bhagavan', ticketNumber: 'B002', ratingGrade: 3.8, examGrade: 4.2, comments: 'Excellent work' },
    { id: 3, name: 'teja', ticketNumber: 'C003', ratingGrade: 4.0, examGrade: 3.9, comments: 'Needs improvement' },
    { id: 4, name: 'vasanth', ticketNumber: 'D004', ratingGrade: 3.2, examGrade: 4.6, comments: 'Outstanding performance' },
    { id: 5, name: 'prasad', ticketNumber: 'E005', ratingGrade: 4.7, examGrade: 3.4, comments: 'Satisfactory' }
];

const Gradebook = () => {
    const examTitle = "Mid2 Exam";
    const examDate = "March 31, 2024";
    const professorName = "Sentil";
    const college = "KL University";
    const department = "CSE-H";
    const semester = "Semester 7";
    const group = "Honors";
    const signature = "senthil";
    const footerDate = "april 6";
    const [showStatistics, setShowStatistics] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortOrderf, setSortOrderf] = useState('asc');
    const [filter, setFilter] = useState('all');

    const handleRowClick = (student) => {
        setSelectedStudent(student);
    };

    const toggleStatistics = () => {
        setShowStatistics(!showStatistics);
    };

    const sortStudents = (students) => {
        return students.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    };
    const filterStudents = (students) => {
        return students.filter(student => {
            if (filter === 'all') {
                return true;
            } else if (filter.toLowerCase() === 'passed') {
                return (0.6 * student.examGrade + 0.4 * student.ratingGrade) > 4;
            } else {
                return (0.6 * student.examGrade + 0.4 * student.ratingGrade) <= 4;
            }
        });
    };
    const sortStudentsf = (students) => {
        return students.sort((a, b) => {
            const finalGradeA = 0.6 * a.examGrade + 0.4 * a.ratingGrade;
            const finalGradeB = 0.6 * b.examGrade + 0.4 * b.ratingGrade;

            if (sortOrderf === 'asc') {
                return finalGradeA - finalGradeB;
            } else {
                return finalGradeB - finalGradeA;
            }
        });
    };

    const sortedStudents = sortStudents(students);
    const sortedStudentsf = sortStudentsf(sortedStudents);
    const filteredStudents = filterStudents(sortedStudentsf);

    return (
        <div>
            <header>
                <p>Title: {examTitle}</p>
                <p>Date: {examDate}</p>
                <p>Professor's Name: {professorName}</p>
                <p>College: {college}</p>
                <p>Department: {department}</p>
                <p>Semester: {semester}</p>
                <p>Group: {group}</p>
            </header>
            <main>
                <div>
                    <label>
                        Sort by name:
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                    <label>
                        Filter by status:
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="Passed">Passed</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </label>
                    <label>
                        Filter by final grade:
                        <select value={sortOrderf} onChange={(e) => setSortOrderf(e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Ticket's Number</th>
                            <th>Rating Grade</th>
                            <th>Exam Grade</th>
                            <th>Final Grade</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr key={student.id} onClick={() => handleRowClick(student)}>
                                <td>{index + 1}</td>
                                <td style={{ textTransform: selectedStudent === student ? 'uppercase' : 'none' }}>{student.name}</td>
                                <td>{student.ticketNumber}</td>
                                <td>{student.ratingGrade}</td>
                                <td>{student.examGrade}</td>
                                <td>{0.6 * student.examGrade + 0.4 * student.ratingGrade}</td>
                                <td>{(0.6 * student.examGrade + 0.4 * student.ratingGrade) > 4 ? 'Passed' : 'Failed'}</td>
                                <td>
                                    {selectedStudent === student && (
                                        <div>
                                            <p>Comments: {student.comments}</p>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={toggleStatistics}>{showStatistics ? 'Hide' : 'Show'} Statistics</button>
                {showStatistics && (
                    <div>
                        <h2>Statistics</h2>
                        <p>Total Students: {students.length}</p>
                        <p>Passed Students: {students.filter(student => student.finalGrade > 4).length}</p>
                        <p>Failed Students: {students.filter(student => student.finalGrade <= 4).length}</p>
                        <p>Average Grade: {students.reduce((acc, student) => acc + (0.6 * student.examGrade + 0.4 * student.ratingGrade), 0) / students.length}</p>

                        <p>Maximal Grade: {Math.max(...students.map(student => 0.6 * student.examGrade + 0.4 * student.ratingGrade))}</p>
                        <p>Minimal Grade: {Math.min(...students.map(student => 0.6 * student.examGrade + 0.4 * student.ratingGrade))}</p>
                       
                    </div>
                )}
            </main>
            <footer>
                <p>Signature:<b> {signature}</b></p>
                <p>Date: <b>{footerDate}</b></p>
            </footer>
        </div>
    );
};

export default Gradebook;
