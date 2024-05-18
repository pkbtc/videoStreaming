import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

// Create directory if it doesn't exist
const uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname));
    }
});

// multer configuration
const upload = multer({ storage: storage });

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:51173"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'hello' });
});

// Corrected route definition
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('file uploaded');
    res.send('File uploaded successfully');
});

app.listen(8000, () => {
    console.log('server running in port 8000');
});
