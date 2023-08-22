const db = require("./db.js");

exports.getAllData = async () => {
	try {
		return new Promise((resolve, reject) => {			

			db.query('SELECT * FROM courses',
				(error, data) => {
					if (error) {
						return reject(error);
					}
					return resolve(data);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM courses  WHERE id = ${id}`, (error, elements) => {
				if (error) {
					return reject(error);
				}
				return resolve(elements);
			});
		});
	} catch (err) {
		console.log(err);
	}
};

exports.instructorById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM instructor WHERE course_id = ${id}`,
				(error, elements) => {
					if (error) {
						return reject(error);
					}
					return resolve(elements);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.coursevideosById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM coursevideos WHERE course_id = ${id}`,
				(error, elements) => {
					if (error) {
						return reject(error);
					}
					return resolve(elements);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getAllChapters = async () => {
	try {
		return new Promise((resolve, reject) => {
			db.query(`SELECT chapters FROM courses`, () => {
				if (error) {
					return reject(error);
				}
				return resolve(elements);
			});
		});
	} catch (error) {
		console.log(error);
	}
};

exports.addCourse = async (childData) => {
	try {
		return new Promise((resolve, reject) => {
			db.query("INSERT INTO courses SET ?", childData, (error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			});
		});
	} catch (error) {
		console.log(error);
	}
};


exports.updateCourse = async (id, updatedData) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE courses SET ? WHERE id = ?`,
				[updatedData, id],
				(error, result) => {
					if (error) return reject(error);
					return resolve(result);
				}
			);
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteCourseById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`delete  FROM courses  WHERE id = ${id}`,
				(error, elements) => {
					if (error) {
						return reject(error);
					}
					return resolve(elements);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};


// instractor

exports.addInstructor = async (childData) => {
	try {
		return new Promise((resolve, reject) => {
			db.query("INSERT INTO instructor SET ?", childData, (error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			});
		});
	} catch (error) {
		console.log(error);
	}
};


exports.updateInstructor = async (id, updatedData) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE instructor SET ? WHERE id = ?`,
				[updatedData, id],
				(error, result) => {
					if (error) return reject(error);
					return resolve(result);
				}
			);
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteInstructorById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`delete  FROM instructor  WHERE id = ${id}`,
				(error, elements) => {
					if (error) {
						return reject(error);
					}
					return resolve(elements);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getAllInstructorData = async () => {
	try {
		return new Promise((resolve, reject) => {			

			db.query('SELECT * FROM instructor',
				(error, data) => {
					if (error) {
						return reject(error);
					}
					return resolve(data);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getInstructorById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM instructor  WHERE id = ${id}`, (error, elements) => {
				if (error) {
					return reject(error);
				}
				return resolve(elements);
			});
		});
	} catch (err) {
		console.log(err);
	}
};


// Steps

exports.addSteps = async (childData) => {
	try {
		return new Promise((resolve, reject) => {
			db.query("INSERT INTO steps SET ?", childData, (error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			});
		});
	} catch (error) {
		console.log(error);
	}
};


exports.updateSteps = async (id, updatedData) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE steps SET ? WHERE id = ?`,
				[updatedData, id],
				(error, result) => {
					if (error) return reject(error);
					return resolve(result);
				}
			);
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteStepsById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`delete  FROM steps  WHERE id = ${id}`,
				(error, elements) => {
					if (error) {
						return reject(error);
					}
					return resolve(elements);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getAllStepsData = async () => {
	try {
		return new Promise((resolve, reject) => {			

			db.query('SELECT * FROM steps',
				(error, data) => {
					if (error) {
						return reject(error);
					}
					return resolve(data);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getStepsById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM steps  WHERE id = ${id}`, (error, elements) => {
				if (error) {
					return reject(error);
				}
				return resolve(elements);
			});
		});
	} catch (err) {
		console.log(err);
	}
};

// material

exports.addMaterials = async (childData) => {
	try {
		return new Promise((resolve, reject) => {
			db.query("INSERT INTO materials SET ?", childData, (error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			});
		});
	} catch (error) {
		console.log(error);
	}
};


exports.updateMaterials = async (id, updatedData) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE materials SET ? WHERE id = ?`,
				[updatedData, id],
				(error, result) => {
					if (error) return reject(error);
					return resolve(result);
				}
			);
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteMaterialsById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(
				`delete  FROM materials  WHERE id = ${id}`,
				(error, elements) => {
					if (error) {
						return reject(error);
					}
					return resolve(elements);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getAllMaterials = async () => {
	try {
		return new Promise((resolve, reject) => {			

			db.query('SELECT * FROM materials',
				(error, data) => {
					if (error) {
						return reject(error);
					}
					return resolve(data);
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getMaterialsById = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM materials  WHERE id = ${id}`, (error, elements) => {
				if (error) {
					return reject(error);
				}
				return resolve(elements);
			});
		});
	} catch (err) {
		console.log(err);
	}
};

