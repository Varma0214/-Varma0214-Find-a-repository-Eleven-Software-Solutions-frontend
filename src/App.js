import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentName, setStudentName] = useState('');

  const fetchCourseTypes = async () => {
    const response = await axios.get('http://localhost:5000/course-types');
    setCourseTypes(response.data);
  };

  const fetchCourses = async () => {
    const response = await axios.get('http://localhost:5000/courses');
    setCourses(response.data);
  };

  const fetchRegistrations = async () => {
    const response = await axios.get('http://localhost:5000/registrations');
    setRegistrations(response.data);
  };

  const addCourseType = async (type) => {
    await axios.post('http://localhost:5000/course-types', { id: Date.now(), type });
    fetchCourseTypes();
  };

  const addCourse = async (course) => {
    await axios.post('http://localhost:5000/courses', { id: Date.now(), course });
    fetchCourses();
  };

  const registerStudent = async () => {
    if (!studentName || !selectedCourseType || !selectedCourse) return;
    await axios.post('http://localhost:5000/registrations', {
      id: Date.now(),
      studentName,
      courseType: selectedCourseType,
      course: selectedCourse,
    });
    setStudentName('');
    setSelectedCourseType('');
    setSelectedCourse('');
    fetchRegistrations();
  };

  useEffect(() => {
    fetchCourseTypes();
    fetchCourses();
    fetchRegistrations();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Course Management System</h1>

      <section>
        <h2>Add Course Type</h2>
        <input
          type="text"
          placeholder="Course Type (e.g., Individual)"
          onKeyDown={(e) => e.key === 'Enter' && addCourseType(e.target.value)}
        />
      </section>

      <section>
        <h2>Add Course</h2>
        <input
          type="text"
          placeholder="Course (e.g., English)"
          onKeyDown={(e) => e.key === 'Enter' && addCourse(e.target.value)}
        />
      </section>

      <section>
        <h2>Register Student</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <select value={selectedCourseType} onChange={(e) => setSelectedCourseType(e.target.value)}>
          <option value="">Select Course Type</option>
          {courseTypes.map((type) => (
            <option key={type.id} value={type.type}>
              {type.type}
            </option>
          ))}
        </select>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.course}>
              {course.course}
            </option>
          ))}
        </select>
        <button onClick={registerStudent}>Register</button>
      </section>

      <section>
        <h2>Registrations</h2>
        <ul>
          {registrations.map((reg) => (
            <li key={reg.id}>
              {reg.studentName} - {reg.courseType}, {reg.course}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
