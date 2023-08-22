var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var coueseRouter = require("./routes/course");
var childrenRouter = require("./routes/child");
var languageRouter = require("./routes/language");
var chatRouter = require("./routes/chat");
var productRouter = require("./routes/product");
var activityRouter = require("./routes/activity");
var userRouter = require("./routes/user");
var admin = require("./routes/admin");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
//app.set('view engine', 'jade');
app.set("view engine", "ejs");

app.use(
	cors({
		origin: "*",
	})
);

app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
//Configuration for Multer

// Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", coueseRouter);
app.use(childrenRouter);
app.use(languageRouter);
app.use(chatRouter);
app.use(productRouter);
app.use(activityRouter);
app.use(userRouter);
app.use(admin);


app.get("/test", function (req, res) {
	var locals = {
		title: "Page Title",
		description: "Page Description",
		header: "Page Header",
	};
	res.render("test", locals);
});

app.get("/playvideo/:name", function (req, res) {
	const range = req.headers.range;
	if (!range) {
		res.status(400).send("Requires Range header");
	}
	// const videoPath = "ElephantsDream.mp4";
	try {
		const videoPath = path.resolve(
			path.join(__dirname, "uploads"),
			req.params.name
		);
		const videoSize = fs.statSync(videoPath).size;
		const CHUNK_SIZE = 10 ** 6;
		const start = Number(range.replace(/\D/g, ""));
		const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
		const contentLength = end - start + 1;
		const headers = {
			"Content-Range": `bytes ${start}-${end}/${videoSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength,
			"Content-Type": "video/mp4",
		};
		res.writeHead(206, headers);
		const videoStream = fs.createReadStream(videoPath, { start, end });
		videoStream.pipe(res);
	} catch (error) {
		console.log(error, "error");
	}
});

const filePath = "./uploads/test.mp4";

app.get("/works-in-chrome-and-safari", cors(), (req, res) => {
	const options = {};

	let start;
	let end;

	const range = req.headers.range;
	if (range) {
		const bytesPrefix = "bytes=";
		if (range.startsWith(bytesPrefix)) {
			const bytesRange = range.substring(bytesPrefix.length);
			const parts = bytesRange.split("-");
			if (parts.length === 2) {
				const rangeStart = parts[0] && parts[0].trim();
				if (rangeStart && rangeStart.length > 0) {
					options.start = start = parseInt(rangeStart);
				}
				const rangeEnd = parts[1] && parts[1].trim();
				if (rangeEnd && rangeEnd.length > 0) {
					options.end = end = parseInt(rangeEnd);
				}
			}
		}
	}

	res.setHeader("content-type", "video/mp4");

	fs.stat(filePath, (err, stat) => {
		if (err) {
			console.error(`File stat error for ${filePath}.`);
			console.error(err);
			res.sendStatus(500);
			return;
		}

		let contentLength = stat.size;

		if (req.method === "HEAD") {
			res.statusCode = 200;
			res.setHeader("accept-ranges", "bytes");
			res.setHeader("content-length", contentLength);
			res.end();
		} else {
			let retrievedLength;
			if (start !== undefined && end !== undefined) {
				retrievedLength = end + 1 - start;
			} else if (start !== undefined) {
				retrievedLength = contentLength - start;
			} else if (end !== undefined) {
				retrievedLength = end + 1;
			} else {
				retrievedLength = contentLength;
			}

			res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

			res.setHeader("content-length", retrievedLength);

			if (range !== undefined) {
				res.setHeader(
					"content-range",
					`bytes ${start || 0}-${end || contentLength - 1}/${contentLength}`
				);
				res.setHeader("accept-ranges", "bytes");
			}

			const fileStream = fs.createReadStream(filePath, options);
			fileStream.on("error", (error) => {
				console.log(`Error reading file ${filePath}.`);
				console.log(error);
				res.sendStatus(500);
			});

			fileStream.pipe(res);
		}
	});
});

app.get("/videoplayer", cors(), (req, res) => {
	const range = req.headers.range;
	const videoPath = "./uploads/test.mp4";
	const videoSize = fs.statSync(videoPath).size;
	const chunkSize = 1 * 1e6;
	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + chunkSize, videoSize - 1);
	const contentLength = end - start + 1;
	const headers = {
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	};
	res.writeHead(206, headers);
	const stream = fs.createReadStream(videoPath, {
		start,
		end,
	});

	res.status = 206;
	res.type = path.extname(videoPath);
	res.body = stream;

	stream.pipe(res);
});

app.get("/works-in-chrome", cors(), (req, res) => {
	res.setHeader("content-type", "video/mp4");

	fs.stat(filePath, (err, stat) => {
		if (err) {
			console.error(`File stat error for ${filePath}.`);
			console.error(err);
			res.sendStatus(500);
			return;
		}

		res.setHeader("content-length", stat.size);

		const fileStream = fs.createReadStream(filePath);
		fileStream.on("error", (error) => {
			console.log(`Error reading file ${filePath}.`);
			console.log(error);
			res.sendStatus(500);
		});

		fileStream.pipe(res);
	});
});

app.get("/video", cors(), function (req, res) {
	const path = "uploads/test.mp4";
	const stat = fs.statSync(path);
	const fileSize = stat.size;
	const range = req.headers.range;
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-");
		const start = parseInt(parts[0], 10);
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
		const chunkSize = end - start + 1;

		console.log("RANGE: " + start + " - " + end + " = " + chunkSize);

		const file = fs.createReadStream(path, { start, end });
		const head = {
			"Content-Range": `bytes ${start}-${end}/${fileSize}`,
			"Content-Ranges": "bytes",
			"Content-Length": chunkSize,
			"Content-Type": "video/mp4",
		};
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			"Content-Length": fileSize,
			"Content-Type": "video/mp4",
		};

		res.setHeader("content-type", "video/mp4");
		res.setHeader("Content-Length", range.end - range.start + 1);
		res.setHeader(
			"Content-Range",
			"bytes " + range.start + "-" + range.end + "/" + size
		);
		res.writeHead(200, head);

		fs.createReadStream(path).pipe(res);
	}
	// res.render('video', {layout: 'videoLayout'});
});

app.use(
	cors({
		origin: "*",
	})
);
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// error handler

process.on("uncaughtException", function (err) {
	// handle the error safely
	console.log(err);
});

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	// res.render('error');
	//console.log(err, "jdkfkjd");
});

module.exports = app;
