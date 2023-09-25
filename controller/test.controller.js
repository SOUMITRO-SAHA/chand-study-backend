const testModel = require('../models/test.model');
const sectionModel = require('../models/section.model');
const questionModel = require('../models/question.model');
const userModel = require('../models/user.model');
const courseModel = require('../models/course.model');
const resultModel = require('../models/result.model');

const {
  testValidator,
  sectionCreateValidator,
  questionCreateValidator,
  sectionUpdateValidator,
} = require('../validator/test.validation');
const { string } = require('joi');
const sequelize = require('../config/db.config');

// Test Controllers:
// FIXME:
exports.getAllTestsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await resultModel.findAll({
      where: {
        userId: parseInt(userId),
      },
    });

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found.',
      });
    }

    // const tests = user.courses.reduce((acc, course) => {
    //   acc.push(...course.tests);
    //   return acc;
    // }, []);

    res.status(200).json({
      success: true,
      message: 'Successfully fetch the test for user',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong, while fetching the test',
      error: error.message,
    });
  }
};

exports.createTest = async (req, res) => {
  try {
    const { error, value } = testValidator.validate(req.body);

    if (error) {
      return res.json({ success: false, error: error.message });
    }

    const {
      testName,
      duration,
      courseId,
      language,
      totalMarks,
      totalQuestions,
    } = value;

    const newTest = await testModel.create({
      testName,
      duration,
      courseId,
      language,
      totalMarks,
      totalQuestions,
    });

    res.status(200).json({
      success: true,
      message: 'Test created successfully',
      test: newTest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the test.',
      error: error.message,
    });
  }
};

exports.updateTestByTestId = async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await testModel.findByPk(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found!',
      });
    }

    const { error } = testValidator.validate(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((err) => err.message),
      });
    }

    await test.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Test Updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating the test',
      error: error.message,
    });
  }
};

exports.getAllTestsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    const tests = await testModel.findAll({
      where: {
        courseId: parseInt(courseId),
      },
    });

    if (!tests) {
      return res.json({
        success: false,
        message:
          'Something went wrong, while fetching the tests of this course.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully fetch all the tests',
      tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'Something went wrong, while fetching the test of this course. Database error',
      error: error.message,
    });
  }
};

exports.getTestByTestId = async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await testModel.findByPk(parseInt(testId), {
      include: [
        {
          model: sectionModel,
          include: questionModel,
        },
      ],
    });

    if (!test) {
      return res.json({
        success: false,
        message: 'Test not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully fetched the Test',
      test,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the Test',
      error: error.message,
    });
  }
};

// Section Controllers:
exports.createSection = async (req, res) => {
  try {
    const { error, value } = sectionCreateValidator.validate(req.body);

    if (error) {
      res.json({ success: false, error: error.message });
      return;
    }

    const {
      title,
      marks,
      negativeMarking,
      canSkip,
      minQuestionsToAdvance,
      testId,
      totalQuestions,
      marksPerQuestion,
    } = value;

    const newSection = await sectionModel.create({
      title,
      marks,
      negativeMarking,
      canSkip,
      minQuestionsToAdvance,
      testId,
      totalQuestions,
      marksPerQuestion,
    });

    if (!newSection) {
      return res.json({
        success: false,
        message: 'Failed to create a new section, database error',
      });
    }

    res.status(200).json({
      success: true, // Change to true
      message: 'Successfully created a new Section',
      section: newSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating a new section',
      error: error.message,
    });
  }
};

exports.getSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await sectionModel.findByPk(sectionId, {
      include: questionModel,
    });

    res.status(200).json({
      success: true,
      message: 'Successfully retrieved section information',
      section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { error, value } = sectionUpdateValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message,
      });
    }

    const [updatedCount] = await sectionModel.update(value, {
      where: {
        id: parseInt(sectionId),
      },
    });

    if (updatedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Section not found, couldn't update.",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully updated section',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the section',
      error: error.message,
    });
  }
};

exports.deleteSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const deletedCount = await sectionModel.destroy({
      where: {
        id: parseInt(sectionId),
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Section not found, couldn't delete.",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully deleted section',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the section',
      error: error.message,
    });
  }
};

exports.getAllSectionByTestId = async (req, res) => {
  try {
    let { testId } = req.params;
    if (typeof testId === string) {
      testId = parseInt(testId);
    }
    const sections = await sectionModel.findAll({
      where: { testId },
    });

    res.status(200).json({
      success: true,
      message: 'Successfully retrieved section information',
      sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSectionsByCourseTest = async (req, res) => {
  try {
    const { courseId, testId } = req.params;
    const course = await courseModel.findByPk(courseId, {
      include: {
        model: testModel,
        where: { id: testId },
        include: {
          model: sectionModel,
          while: { testId: testId },
        },
      },
    });

    if (!course) {
      return res.json({
        success: false,
        message: `There is no test in this course with this test id: ${testId}`,
      });
    }

    const section = course?.tests[0].sections;
    res.status(200).json({
      success: true,
      message:
        'Successfully fetched the list of questions of the specified section',
      section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong, while fetching the courses',
      error: error.message,
    });
  }
};

exports.getAllSectionsByDifferentTitle = async (req, res) => {
  try {
    const sections = await sectionModel.findAll({
      attributes: ['title'],
      group: ['title'],
    });

    if (!sections) {
      return res.json({
        success: false,
        message: 'No sections found',
      });
    }

    res.status(200).json({
      success: false,
      message: 'Successfully fetched all sections with different titles.',
      sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.addExistingQuestionToCurrentSection = async (req, res) => {
  try {
    const { questionId, sectionId } = req.body;

    // Check if the question with the given questionId exists
    const question = await questionModel.findByPk(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    const newQuestion = await questionModel.create({
      content: question.content,
      options: question.options,
      correctAnswer: question.correctAnswer,
      sectionId: sectionId,
    });

    res.status(200).json({
      success: true,
      message: 'Question added to the section successfully.',
      newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the question to the section.',
      error: error.message,
    });
  }
};

// Questions Controllers:
exports.createQuestion = async (req, res) => {
  try {
    const { error, value } = questionCreateValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    const { content, options, correctAnswer, sectionId } = value;

    const newQuestion = await questionModel.create({
      content,
      options,
      correctAnswer,
      sectionId,
    });

    res.status(200).json({
      success: true,
      message: 'Question created successfully',
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the question.',
      error: error.message,
    });
  }
};

exports.updateQuestionsByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params;

    // Now, find the Question in the database
    const question = await questionModel.findByPk(questionId);

    if (!question) {
      return res.json({
        success: false,
        message: 'Question not found',
      });
    }

    // Update:
    await question.update(req.body);

    res
      .status(200)
      .json({ success: true, message: 'Question updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteQuestionByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params;
    await questionModel.destroy({
      where: {
        id: questionId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getQuestionsBySectionTitle = async (req, res) => {
  try {
    const { title } = req.params;

    // First find the section based on the title
    const section = await sectionModel.findOne({
      where: { title },
      include: questionModel,
    });

    if (!section) {
      return res.json({
        success: false,
        message: 'Section not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully fetched all the questions of current section.',
      questions: section.questions,
    });
  } catch (error) {}
};

exports.getQuestionsBySectionId = async (req, res) => {
  try {
    let { sectionId } = req.params;

    const questions = await sectionModel.findByPk(sectionId, {
      include: questionModel,
    });

    if (!questions) {
      return res.status(400).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully fetched all the question fetched',
      questions: questions.questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel.findAll();

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Extra:
exports.getTestInstructionsByTestId = async (req, res) => {
  try {
    const { testId } = req.params;

    const test = await testModel.findByPk(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        questions: test.totalQuestions,
        marks: test.totalMarks,
        instruction: test.instruction,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching test instructions',
      error: error.message,
    });
  }
};

exports.addQuestionsToSectionBySectionId = async (req, res) => {
  try {
    const { questions, sectionId } = req.body;

    // Find the section based on sectionId
    const section = await sectionModel.findByPk(sectionId);

    if (!section) {
      return res.json({
        success: false,
        message: 'Section not found',
      });
    }

    // Create the questions and associate them with the section
    const createdQuestions = await questionModel.bulkCreate(questions, {
      returning: true,
    });

    await section.addQuestions(createdQuestions);

    res.status(200).json({
      success: true,
      message: 'Questions added to section successfully',
      questions: createdQuestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
