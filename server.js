const fileupload = require("express-fileupload");
const express = require("express");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileupload({
        createParentPath: true,
    }),
);

app.post("/upload", uploadFiles);

async function uploadFiles(req, res) {

    const {body} = req;
    console.log(req.body);
    console.log(req.files)
  
    try {
        if (!req.files) {
            res.send({
                status: "failed",
                message: "No file uploaded",
            });
        } else {
            let file = req.files.file;
            const buffer = file.data;

            res.send(`<pre>
Make: ${body.make}
Model: ${body.model}
Badge: ${body.badge}

Logbook:

${buffer.toString('utf8')}
                </pre>`);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

app.listen(PORT, () => {
    console.log(`Server started...`);
});