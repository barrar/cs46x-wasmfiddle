var router = require('express').Router();
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { v4 } = require('uuid');
fs = require('fs');
path = require('path')

router.post('/compilerC/receiver', async (req, res) => {
    let buildID = v4(); // Generate UUID

    let buildPath = path.join(__dirname, '../', 'builds/', buildID, '/');
    let sourcePath = path.join(buildPath, 'source.c');

    await exec("mkdir " + buildPath);

    await fs.writeFile(sourcePath, req.body.webassemblyEditorValue, { flag: 'w' }, (err) => {
        if (err) throw err;
    });

    exec("/home/student/emsdk/upstream/emscripten/emcc ./source.c -o out.html &", { cwd: buildPath });


    res.status(200).json({ link: "https://wasmfiddle.ml/builds/" + buildID + "/out.html" });


});

module.exports = router;