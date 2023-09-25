const courseModel = require('../models/course.model');
const testModel = require('../models/test.model');
const enrollmentModel = require('../models/enroll.model');
const {
  courseCreateValidator,
  courseUpdateValidator,
} = require('../validator/course.validation');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const sequelize = require('../config/db.config');

// Only Admin:
exports.create = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error occurred while parsing form data',
        error: err.message,
      });
    }

    const {
      courseName,
      courseDescription,
      price,
      whatYouGet,
      youtubeLink,
      language,
      courseValidity,
    } = fields;

    // Create the course object
    const courseObj = {
      courseName: courseName[0],
      courseDescription: courseDescription[0],
      price: parseInt(price[0]),
      whatYouGet: whatYouGet[0].split(','),
      youtubeLink: youtubeLink[0],
      language: language[0],
      defaultValidityDuration: parseInt(courseValidity[0]),
    };

    // Validate the course object
    const { error, value } = courseCreateValidator.validate(courseObj);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message,
      });
    }

    if (!files.images) {
      return res.status(400).json({
        success: false,
        message: 'No photo is selected',
      });
    }

    try {
      // Handle image upload
      const uploadFolderPath = path.join(__dirname, '../uploads/courses');
      const photo = files.images;
      const filePath = photo[0].filepath;
      const data = fs.readFileSync(filePath);
      const imageExtension = photo[0].mimetype.split('/')[1];
      const imageName = `${Date.now()}.${imageExtension}`;
      const imagePath = path.join(uploadFolderPath, imageName);
      fs.writeFileSync(imagePath, data);

      // Create the course in the database
      const newCourse = await courseModel.create({
        ...courseObj,
        images: imagePath,
      });

      if (!newCourse) {
        return res.json({
          success: false,
          message: 'Error creating new course',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Course created successfully',
        course: newCourse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating a new course',
        error: error.message,
      });
    }
  });
};

exports.updateCourseById = async (req, res) => {
  const { courseId } = req.params;
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error occurred while parsing form data',
        error: err.message,
      });
    }

    const {
      courseName,
      courseDescription,
      price,
      whatYouGet,
      youtubeLink,
      language,
      courseValidity,
    } = fields;

    // Create the course object
    // Create the course object
    const courseObj = {};

    if (courseName && courseName[0]) {
      courseObj.courseName = courseName[0];
    }

    if (courseDescription && courseDescription[0]) {
      courseObj.courseDescription = courseDescription[0];
    }

    if (price && price[0]) {
      courseObj.price = parseInt(price[0]);
    }

    if (whatYouGet && whatYouGet[0]) {
      courseObj.whatYouGet = whatYouGet[0].split(',');
    }

    if (youtubeLink && youtubeLink[0]) {
      courseObj.youtubeLink = youtubeLink[0];
    }

    if (language && language[0]) {
      courseObj.language = language[0];
    }

    if (courseValidity && courseValidity[0]) {
      courseObj.defaultValidityDuration = parseInt(courseValidity[0]);
    }

    // Validate the course object
    const { error, value } = courseUpdateValidator.validate(courseObj);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message,
      });
    }

    try {
      // Handle image upload
      let imagePath = '';
      const updateObject = {
        ...value,
      };

      if (files.images) {
        const uploadFolderPath = path.join(__dirname, '../uploads/courses');
        const photo = files.images;
        const filePath = photo[0].filepath;
        const data = fs.readFileSync(filePath);
        const imageExtension = photo[0].mimetype.split('/')[1];
        const imageName = `${Date.now()}.${imageExtension}`;
        imagePath = path.join(uploadFolderPath, imageName);
        fs.writeFileSync(imagePath, data);

        // Updating the Update Object
        updateObject.images = imagePath;
      }

      console.log(updateObject);

      const updateCourse = await courseModel.update(updateObject, {
        where: {
          id: parseInt(courseId),
        },
      });

      if (!updateCourse) {
        return res.status(404).json({
          success: false,
          message: "Couldn't update course, Course Not Found!",
        });
      }

      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        updateCourse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the course',
        error: error.message,
      });
    }
  });
};

exports.deleteCourseById = async (req, res) => {
  const { courseId } = req.params;

  try {
    const deletedCourse = await courseModel.destroy({
      where: {
        id: parseInt(courseId),
      },
    });

    if (!deletedCourse) {
      return res.json({
        success: false,
        message: "Couldn't delete course, Course Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
      deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the course',
      error: error.message,
    });
  }
};

// Any one:
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.findAll();
    if (!courses) {
      return res.json({
        success: false,
        message: 'Course not found any course on the Database',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course found successfully',
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching courses from the Database',
      error: error.message,
    });
  }
};

exports.getCouresByCourseId = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await courseModel.findByPk(courseId);
    if (!course) {
      return res.json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course found successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong, while fetching courses by course id',
      error: error.message,
    });
  }
};

exports.getAllTestsByCourseId = async (req, res) => {
  const { courseId } = req.params;
  try {
    const tests = await testModel.findAll({
      where: { courseId: parseInt(courseId) },
    });

    res.status(200).json({
      success: true,
      message: 'Tests retrieved successfully',
      tests: tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving tests',
      error: error.message,
    });
  }
};

exports.getPopularCourses = async (req, res) => {
  try {
    const popularCoursesArray = [];
    const popularCourses = await enrollmentModel.findAll({
      attributes: [
        'courseId',
        [sequelize.fn('COUNT', sequelize.col('userId')), 'userCount'],
      ],
      group: ['courseId'],
      order: [['userCount', 'DESC']],
    });

    const courseDetailPromises = popularCourses.map(async ({ courseId }) => {
      const courseDetails = await courseModel.findAll({
        where: {
          id: courseId,
        },
      });

      return courseDetails;
    });

    const resolvedCourseDetails = await Promise.all(courseDetailPromises);

    resolvedCourseDetails.forEach((courseDetail) => {
      popularCoursesArray.push(...courseDetail);
    });

    res.status(200).json({
      success: true,
      message: 'Successfully fetched popular courses',
      courses: [...popularCoursesArray],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching popular courses',
      error: error.message,
    });
  }
};

exports.getRecentlyAddedCourses = async (req, res) => {
  try {
    const courses = await courseModel.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    if (!courses) {
      return res.json({
        success: false,
        message: "couldn't found any recently addes courses on the Database",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course found successfully',
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching courses from the Database',
      error: error.message,
    });
  }
};

exports.getFeaturedCourses = async (req, res) => {
  try {
    const featuredCourses = await courseModel.findAll({
      where: { isFeatured: true },
    });

    res.status(200).json({
      success: true,
      message: 'Successfully fetched featured courses',
      courses: featuredCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching featured courses',
      error: error.message,
    });
  }
};

exports.getFreeCourses = async (req, res) => {
  try {
    const freeCourses = await courseModel.findAll({
      where: { price: 0 },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      message: 'Successfully fetched all free courses',
      courses: freeCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching free courses',
      error: error.message,
    });
  }
};

exports.categoryFilter = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'CategoryId is required in the request body.',
      });
    }

    const courses = await courseModel.findAll({
      where: { categoryId },
    });

    if (!courses) {
      return res.status(404).json({
        success: false,
        message: 'No courses found for the specified category.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Courses filtered by category successfully.',
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while filtering courses by category.',
      error: error.message,
    });
  }
};

exports.banner = async (req, res) => {
  try {
    const result = {};
    const popularCoursesArray = [];
    // Fetch popular courses with user count
    const popularCourses = await enrollmentModel.findAll({
      attributes: [
        'courseId',
        [sequelize.fn('COUNT', sequelize.col('userId')), 'userCount'],
      ],
      group: ['courseId'],
      order: [['userCount', 'DESC']],
    });

    const courseIds = popularCourses.map(async (course) => {
      const courseDetails = await courseModel.findAll({
        where: {
          id: course.courseId,
        },
      });

      // Pushing the Result in to an array:
      popularCoursesArray.push(...courseDetails);
    });

    // Fetch featured courses
    const featuredCourses = await courseModel.findAll({
      where: { isFeatured: true },
      limit: 2,
    });

    // Mergins the Results;
    result.featuredCourses = featuredCourses;

    res.status(200).json({
      success: true,
      message: 'Successfully fetched featured courses',
      data: [...popularCoursesArray, ...result.featuredCourses], // Changed 'courses' to 'data' for consistency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching featured courses',
      error: error.message,
    });
  }
};
