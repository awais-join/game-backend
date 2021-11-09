const { createNewSubmission, createNewCourse, fetchUniversityByID, createNewMLBotResponse } = require("../lib/db");
const { decodeToken } = require("../lib/utils");
const axios = require('axios')

module.exports.handler = async function createSubmission(event) {
    const body = JSON.parse(event.body);

    const userObj = await decodeToken(event.headers.Authorization);

    var submission = {
        reviewStatus: "UNOFFICIAL REVIEW",
        provider_id: userObj.providerId,
        universities: body.universities,
    }

    try {
        const submissionResponse = await createNewSubmission(submission)

        const courses = body.courses
        const coursesResponse = []
        const comparison_courses = []
        const compare_schools = []

        for (let i = 0; i < courses.length; i++) {
            var course = courses[i]
            course.submission_id = submissionResponse.id
            const courseResponse = await createNewCourse(course)
            coursesResponse.push(courseResponse)
            comparison_courses.push([course.courseId, course.courseTitle])
        }

        for (let i = 0; i < body.universities.length; i++) {
            var uniID = body.universities[i]
            const university = await fetchUniversityByID(uniID)
            compare_schools.push(university.name)
        }

        const botRequest = {
            school_name: userObj.organization,
            comparison_courses: comparison_courses,
            compare_schools: compare_schools
        }

        console.log("BOT REQUEST :::: " + JSON.stringify(botRequest))

        const botResponse = await axios.post('http://34.122.3.153:5000/course', botRequest)

        console.log("BOT RESPONSE :::: " + JSON.stringify(botResponse.data))

        const matches = botResponse.data.completed_matches
        const botResponsedSaved = []
        for (let i = 0; i < matches.length; i++) {
            const matchRequest = {
                mainSchool: matches[i].main_school,
                mainSchoolCourse: matches[i].main_school_course,
                comparisonSchool: matches[i].comparison_school,
                match: matches[i].match,
                eval: matches[i].eval,
                contactHours: matches[i].contact_hours,
                outcome: matches[i].outcome,
                submission_id: submissionResponse.id
            }
            console.log(matchRequest)
            const botResponseSaved = await createNewMLBotResponse(matchRequest)
            botResponsedSaved.push(botResponseSaved)
        }

        console.log(botResponsedSaved)

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ submission: submissionResponse, courses: coursesResponse, botResponsedSaved })
        };
    } catch (err) {
        console.log("ERROR: " + err)
        return {
            statusCode: err.statusCode || 500,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: { stack: err.stack, message: err.message }
        };
    }

};