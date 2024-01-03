import fs from "fs";
import {sendMail} from "./utils/mail.ts";

const content = JSON.parse(fs.readFileSync('out/weekly-most-pirated-movies.json', 'utf8'));
const {title, movies} = content;
sendMail(title, JSON.stringify(movies, null, 2));
