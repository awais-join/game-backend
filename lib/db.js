const bcrypt = require("bcryptjs");
const University = require("../models/University");
const connectToDatabase = require('./connection')

module.exports.registerNewUser = async(props) => {

    try {

        const { User } = await connectToDatabase()
        props.passwordHash = await bcrypt.hash(props.password, 8); // hash the pass
        delete props.password;
        const user = await User.create(props)

        return user

    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};


module.exports.updateUser = async(props) => {

    try {
        const { User } = await connectToDatabase()

        var values = {
            first_name: props.first_name,
            last_name: props.last_name,
        }
        var selector = {
            where: { id: props.id }
        }

        const response = await User.update(values, selector)
        return response
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.removeUser = async(props) => {

    try {
        const { User } = await connectToDatabase()
        const rowDeleted = await User.destroy({
            where: {
                id: props.id
            }
        })
        return rowDeleted
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.getUserByEmail = async email => {

    try {
        const { User, Timeline } = await connectToDatabase()
        let user = await User.findOne({
            where: {
                email: email
            }
            // ,
            // include: [{
            //     model: Timeline,
            //     as: 'timelines',
            //     required: false,
            //     attributes: { exclude: ['description', 'createdAt', 'updatedAt', 'userId'] }
            // }
            // ]
        })
        return user
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.getProviderByUserId = async userId => {

    try {
        const { Provider } = await connectToDatabase()
        let provider = await Provider.findOne({
            where: {
                userId: userId
            }
        })
        return provider
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.createProvider = async(props) => {

    try {
        const { Provider } = await connectToDatabase()
        const provider = await Provider.create(props)
        const { User } = await connectToDatabase()
        let user = await User.findOne({
            where: {
                id: props.userId
            }
        })
        return ({ provider, user })
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.createNewSubmission = async(props) => {

    try {
        const { Submission, UniversitySubmission } = await connectToDatabase()

        const universities = props.universities
        delete props.universities;

        const _submission = await Submission.create(props)

        for (let i = 0; i < universities.length; i++) {
            await UniversitySubmission.create({
                submission_id: _submission.id,
                university_id: universities[i],
            });
        }

        return _submission
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.createNewMLBotResponse = async(props) => {

    console.log("props  :::: " + props)
    try {
        const { MLBotResponse } = await connectToDatabase()
        const response = await MLBotResponse.create(props)
        return response
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.createNewCourse = async(props) => {

    try {
        const { Course } = await connectToDatabase()
        const course = await Course.create(props)
        return course
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
}

module.exports.createNewGroup = async(props) => {

    try {
        const { Group, Timeline } = await connectToDatabase()
        const group = await Group.create(props)

        const timeline = await Timeline.findOne({ id: group.timelineId })

        timeline.changed("updatedAt", true);
        await timeline.save();


        return group
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.createNewEvent = async(props) => {

    try {
        const { Event, Group, Timeline } = await connectToDatabase()
        const event = await Event.create(props)

        const group = await Group.findOne({ where: { id: props.groupId } })

        const timeline = await Timeline.findOne({ where: { id: group.timelineId } })

        console.log("Timeline: ", timeline)
        console.log("Group: ", group)
        console.log("Event: ", event)

        timeline.changed("updatedAt", true);
        await timeline.save();

        const updatedTimeline = await Timeline.findOne({ id: group.timelineId })

        console.log("Updated Timeline: ", updatedTimeline)

        return event
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};


module.exports.getTimeline = async timelineId => {

    try {
        const { Timeline, Group, Event } = await connectToDatabase()
        let timeline = await Timeline.findOne({
            where: {
                id: timelineId
            },
            include: [{
                model: Group,
                as: 'groups',
                required: false,
                include: [{
                    model: Event,
                    as: 'events',
                    required: false
                }]
            }],
        })
        return timeline
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.fetchAllUniversities = async() => {

    try {
        const { University } = await connectToDatabase()
        let universities = await University.findAll()
        return universities
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.fetchUniversityByID = async(uniID) => {

    try {
        const { University } = await connectToDatabase()
        let university = await University.findOne({
            where: {
                id: uniID
            }
        })
        return university
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.getSubmissionsByProviderId = async(providerId) => {

    try {
        const { Submission, University } = await connectToDatabase()
        let submissions = await Submission.findAndCountAll({
            where: { provider_id: providerId },
            // offset: offset,
            // limit: limit,
            // distinct: true,
            include: [{
                model: University,
                as: 'universities',
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                }
            }]
        });

        return submissions
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.fetchMLBOTResponseBySubmissionID = async(submissionId) => {

    try {
        const { MLBotResponse } = await connectToDatabase()
        let results = await MLBotResponse.findAndCountAll({
            where: { submission_id: submissionId },
            // offset: offset,
            // limit: limit,
            // distinct: true,
        });

        return results
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};