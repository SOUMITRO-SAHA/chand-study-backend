const testModel = require("../models/test.model");
const sectionModel = require("../models/section.model");
// Todo: Pending
exports.createTest = async (req, res) => {};
// Todo: Not Tested
exports.getTestById = async (req, res) => {
	try {
		const { testId } = req.params;
		const test = await testModel.findByPk(testId, {
			include: sectionModel,
		});

		if (!test) {
			return res.json({
				success: false,
				message: "Test not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Successfully fetched the Test",
			test,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching the Test",
			error: error.message,
		});
	}
};
