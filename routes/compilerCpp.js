var router = require('express').Router();
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { v4 } = require('uuid');
fs = require('fs');
path = require('path')

router.post('/compiler/cpp', async (req, res) => {
    let buildID = v4(); // Generate UUID
    let buildPath = path.join(__dirname, '../', 'builds/', buildID, '/');
    let sourcePath = path.join(buildPath, 'source.cpp');

    await exec("mkdir " + buildPath);
    await fs.writeFile(sourcePath, req.body.webassemblyEditorValue, { flag: 'w' }, (err) => {
        if (err) throw err;
    });

    // when a warning is thrown the compiler fails to complete, so I used -Wno-everything
    exec("emcc -Wno-everything ./source.cpp -o out.html --shell-file ../../em_template.html &", { cwd: buildPath });

    res.status(200).json({ link: "https://wasmfiddle.ml/builds/" + buildID + "/out.html" });
});

module.exports = router;