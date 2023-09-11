const sectionModel = require("../models/section.model");
const questionModel = require("../models/question.model");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const readXlsxFile = require("read-excel-file/node");

exports.uploadAndImportQuestions = async (req, res) => {
	const form = new formidable.IncomingForm();

	form.parse(req, async (err, fields, files) => {
		try {
			if (err) {
				throw new Error("Error occurred while parsing form data");
			}

			let { sectionId } = req.params;
			sectionId = parseInt(sectionId);

			if (!files.xlsx) {
				throw new Error("Please select an Excel file with .xlsx extension");
			}

			const uploadFolderPath = path.join(__dirname, "../uploads/questions");
			const excelFile = files.xlsx;
			const filePath = excelFile[0].filepath;
			const data = fs.readFileSync(filePath);
			const fileType = excelFile[0].mimetype;

			if (!fileType.includes("sheet")) {
				throw new Error("Please select an Excel file with .xlsx extension");
			}

			const fileName = `text-question.xlsx`;
			const uploadPath = path.join(uploadFolderPath, fileName);

			fs.writeFileSync(uploadPath, data);

			const questions = await readXlsxFile(Buffer.from(data));

			// Separating the questions:
			// Skip the header of the excel file
			questions.shift();

			const questionPromises = questions.map(async (row) => {
				const questionObject = {
					question: row[0],
					optionA: row[1],
					optionB: row[2],
					optionC: row[3],
					optionD: row[4],
					answer: row[5],
				};

				const question = await questionModel.create({
					content: questionObject.question,
					options: [
						questionObject.optionA,
						questionObject.optionB,
						questionObject.optionC,
						questionObject.optionD,
					],
					correctAnswer: questionObject.answer,
					sectionId,
				});

				return question;
			});

			const createdQuestions = await Promise.all(questionPromises);

			res.status(200).json({
				success: true,
				message: "Questions uploaded successfully",
				data: createdQuestions,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				error: error.message,
			});
		}
	});
};
