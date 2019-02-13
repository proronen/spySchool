module.exports = function (express, passport, jwt) {
    
    const router = express.Router();
    
    router.get('/', (req, res) => {
        res.send('Welcome to spy school api');
    });
    
//    router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
//        res.send(req.body.user);
//    });

    // This should be a POST router and authorized
    // I have chosen passport to later use it with facebook and google login,
    // But because of time limitations and having an issue with passport token i cannot resolve at the moment
    // I am exposing this route only for this excercise. 

    // the passport middleware: passport.authenticate('jwt', { session: false })

    router.get('/getFolders', (req, res) => {
        
        // In this excersice im only going to expose to the "spy" the sample folder and I have created it so 
        // I am not checking for errors or exists etc... 
        const dir = 'sample';
        var fs = require('fs');
        var path = require('path');
        
        const getFilesFromDir = (dir, excludeFolders) => {
            var filesToReturn = [];
            function walkDir(currentPath) {
                var files = fs.readdirSync(currentPath);
                for (var i in files) {
                    var curFile = path.join(currentPath, files[i]);
                    if (fs.statSync(curFile).isDirectory() && !excludeFolders.includes(curFile.replace(dir+'/', ''))) {
                        
                        const dirName = curFile.replace(dir, '');

                        const dirParts = dirName.split('/');
                        const absName = dirParts[dirParts.length-1].replace(" ","_");

                        if(dirParts.length >= 3) {
                            // parent dir
                            const parentDir = filesToReturn[filesToReturn.length-1]
                            parentDir.children = [];
                            parentDir.children.push({id: id, dirName: dirName, absName: absName })
                        } else {
                            // absName will be the reference with him i will associate the folders childern
                            filesToReturn.push({id: id, dirName: dirName, absName: absName });
                        }

                        id++;
                        walkDir(curFile);
                    }
                }
            };
            
            walkDir(dir);
            return filesToReturn; 
          }
           
          //print the txt files in the current directory
          let id = 1;
          let excludeFolders = ["node_modules"];
          const directories =  getFilesFromDir("sample", excludeFolders);

          res.status(200).json(directories);
    });
    
    router.post('/getToken', (req, res) => {
        if(!req.body.username || !req.body.password) {
            return res.status(401).send('all Fields ar required!');
        }
    
        const token = jwt.sign({id: '123'}, process.env.secretOrKey)
        res.send({token: token});
    });

    return router;
}