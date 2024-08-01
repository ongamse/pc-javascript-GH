const fs = require("fs");
const { logger } = require("../Logger");

class ImageLookup {
  get(req, res) {
	import fs from 'fs';
	import path from 'path';
	import logger from '../logger';

	function get(req, res) {
	  try {
	    /* Validate and sanitize the input to prevent directory traversal */
	    const sanitizedFileName = path.normalize(req.query.image).replace(/^(\.\.[\/\\])+/, '');

	    /* Read the file from the sanitized path */
	    const filePath = path.join(__dirname, '..', 'uploads', sanitizedFileName);
	    const fileContent = fs.readFileSync(filePath).toString();

	    /* Log the file content and send it back to the client */
	    logger.debug(fileContent);
	    res.send(fileContent);
	  } catch (error) {
	    /* Handle any errors that may occur during file reading */
	    logger.error(error);
	    res.status(500).send('Error reading file');
	  }
	}


module.exports = ImageLookup;

