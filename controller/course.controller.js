const { validationResult } = require("express-validator");
const Course = require("../models/course.model");

exports.create = (req, res) => {
	const errors = validationResult(req);

	// if there is error then return Error
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
		});
	}

	const course = {
		courseName: req.body.courseName,
		courseDesc: req.body.courseDesc,
		instructorOccupation: req.body.instructorOccupation,
		instructorName: req.body.instructorName,
		instructorDesc: req.body.instructorDesc,
		courseDesc: req.body.courseDesc,
		price: req.body.price,
		whatYouGet: req.body.whatYouGet,
	};

	Course.create(course, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the course.",
			});
		else res.send(data);
	});
};

exports.addCourse = async (req, res) => {	
	try {
    const course = {
			courseName: req.body.courseName,
			courseDesc: req.body.courseDesc,		
			price: req.body.price,
			whatYouGet: req.body.whatYouGet,
			youtubelink: req.body.youtubelink,
			images: req.file && req.file.filename ? req.file.filename : "",
		};

		const data = await Course.addCourse(course);
		res.send(data);
		
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: error.message || "Some error occurred while retrieving Course.",
		});
		
	}

};


exports.updateCourse = async (req, res) => {
	try {		
        const updatedData = req.body;
			if(req.file){
					images= req.file && req.file.filename ? req.file.filename : ""  
				updated =  {...updatedData, images}
			}else {
				delete updatedData['image']; 
				updated=updatedData
			}
			
	        const CourseData = await  Course.updateCourse(req.params.id,updated);       
		
		res.send(CourseData)
			
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Failed to mark activity as complete" });
	}
};

exports.deleteCourseById = async (req, res) => {
	try {
		
		const Coursedata = await  Course.deleteCourseById(req.params.id);       
		
		res.send(Coursedata)

	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Failed to mark activity as complete" });
	}
};


exports.get = async (req, res) => {
	try {
		const data = await Course.getById(req.params.id);

		let newObject = await Promise.all(
			data.map(async (value) => {
				const instructorData = await Course.instructorById(value.id);
				const coursevideo = await Course.coursevideosById(value.id);

				return { course: data[0], instructorData, coursevideo };
			})
		);

		res.send(...newObject);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Course.",
		});
	}
};

exports.getAll = async (req, res) => {
	try {
		const data = await Course.getAllData();
		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Course.",
		});
	}
};




exports.delete = (req, res) => {
	Course.deleteById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error retrieving Course with id " + req.params.id,
			});
		} else res.send({ message: "delete sucessfully" });
	});
};

exports.update = (req, res) => {
	// Validate Request
	const errors = validationResult(req);

	// if there is error then return Error
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
		});
	}

	Course.updateById(req.params.id, req.body, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Course with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: "Error updating Course with id " + req.params.id,
				});
			}
		} else res.send(data);
	});
};

exports.list = (req, res) => {
	Course.getAllData((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Course.",
			});
		else res.send(data);
	});
};

exports.listImage = (req, res) => {
	Course.getAllData((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Course.",
			});
		else res.send(data);
	});
};


// Instructor 

exports.addInstructor  = async (req, res) => {	
	try { 

		const adddata ={
			course_id: req.body.course_id,
			name: req.body.name,		
			description: req.body.description,
			occupation: req.body.occupation,
			image: req.file && req.file.filename ? req.file.filename : "",
	 }
		const data = await Course.addInstructor(adddata);
		res.send(data);
		
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: error.message || "Some error occurred while retrieving Course.",
		});
		
	}

};


exports.updateInstructor  = async (req, res) => {
	try {
		 
			 const updatedData = req.body;
			 if(req.file){
					 image= req.file && req.file.filename ? req.file.filename : ""  
				 updated =  {...updatedData, image}
			 }else {
				 delete updatedData['image']; 
				 updated=updatedData
			 }

	        const CourseData = await  Course.updateInstructor(req.params.id,updated);       
		
		res.send(CourseData)
			
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Failed to mark activity as complete" });
	}
};

exports.deleteInstructorById = async (req, res) => {
	try {
		
		const Coursedata = await  Course.deleteInstructorById(req.params.id);       
		
		res.send(Coursedata)

	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Failed to mark activity as complete" });
	}
};


exports.getInstructor  = async (req, res) => {
	try {
		const data = await Course.getInstructorById(req.params.id);

		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Course.",
		});
	}
};

exports.getAllInstructor  = async (req, res) => {
	try {
		const data = await Course.getAllInstructorData();
		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Course.",
		});
	}
};


// Steps


exports.addSteps  = async (req, res) => {	
	try { 
        console.log(req.body)
		const data = await Course.addSteps(req.body);
		res.send(data);
		
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: error.message || "Some error occurred while retrieving Course.",
		});
		
	}

};


exports.updateSteps  = async (req, res) => {
	try {
	     const CourseData = await  Course.updateSteps(req.params.id,req.body);       
		
		res.send(CourseData)
			
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Failed to mark activity as complete" });
	}
};

exports.deleteStepsById = async (req, res) => {
	try {
		
		const Coursedata = await  Course.deleteStepsById(req.params.id);       
		
		res.send(Coursedata)

	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Failed to mark activity as complete" });
	}
};


exports.getSteps  = async (req, res) => {
	try {
		const data = await Course.getStepsById(req.params.id);

		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Course.",
		});
	}
};

exports.getAllSteps  = async (req, res) => {
	try {
		const data = await Course.getAllStepsData();
		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Course.",
		});
	}
};

// materials 
exports.addMaterials  = async (req, res) => {	
	try { 
        console.log(req.body)
		const data = await Course.addMaterials(req.body);
		res.send(data);
		
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: error.message || "Some error occurred while retrieving Course.",
		});
		
	}

};


exports.updateMaterials  = async (req, res) => {
	try {
	     const CourseData = await  Course.updateMaterials(req.params.id,req.body);       
		
		res.send(CourseData)
			
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Failed to mark activity as complete" });
	}
};

exports.deleteMaterialsById = async (req, res) => {
	try {
		
		const Coursedata = await  Course.deleteMaterialsById(req.params.id);       
		
		res.send(Coursedata)

	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Failed to mark activity as complete" });
	}
};


exports.getMaterials  = async (req, res) => {
	try {
		const data = await Course.getMaterialsById(req.params.id);

		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Course.",
		});
	}
};

exports.getAllMaterials  = async (req, res) => {
	try {
		const data = await Course.getAllMaterials();
		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Course.",
		});
	}
};