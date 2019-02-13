module.exports = express => {
    
    const app = express();
    const router = express.Router();
    const fs = require('fs')
    
    // This is the eventstream our react server will register to for eventsource events 
    router.get('/eventstream', (req, res, next) => {
        res.set({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-transform',
            'Connection': 'keep-alive'
        });

        // Later we will emit messages and write them to the client.
        app.on('message', data => {
            res.write(`event: message\n`);
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        });
    });

    // I Have used both chokidar and fbwatch only to find out the native fs.watch works best, 
    // At least for this small project(and on my ubuntu os).

    //const watcher = require('../util/chokidar');
    //const fbwatcher = require('../util/fbwatch');

    // As I wanted to let our spies spy on mulitple folders, all watchers will reside here to later be closed
    let w = new Array();

    router.post('/start', (req, res) => {

        const folders = req.body.folders;
        
        if(!folders && folders != "") {
            res.status(401).send({error: 'Nothing to spy on, Please select a folder'});
        }
        
        const callFolders = (started) => {
            // "sample" folder is just a folder with subfolders i created to write to the files in it to simulate changes
            folders.forEach(dir => {
                if(!started){
                    
                    let fsWait = false;
                    const theWatcher = fs.watch("/var/www/html/spy/server/sample/"+dir, (event, filename) => {
                        if (filename) {
                            if (fsWait) return;
                            fsWait = setTimeout(() => {
                                fsWait = false;
                            }, 100);
                            console.log(`${filename} has changed`)
                            // this will send the SSE back to our client
                            app.emit('message', {
                                msg: `${filename} file Changed`,
                                timestamp: new Date()
                            });
                        }
                    });

                    // Here im pushing the watchers to later be close all together, but I could have made an object with 
                    // an identifier for each watcher and close only that watcher and continue spying on the others, 
                    // but I believe this is not mandatory for this example
                    w.push({"id": dir, "watcher": theWatcher});
                }
                
                // This function will simulate writing to files in our path
                (writeTofile = dir => {
                    fs.appendFileSync(`sample/${dir}/${dir}.txt`,"some text \n");
                })(dir);
            });   
        }
        
        callFolders();
        setInterval(() => {
            callFolders(true);
        }, 3000)   
        res.status(200).send({test: "test"})
    })
    
    router.post('/stop', (req, res) => {
        
        w.forEach(item => {
            item.watcher.close();
        })
        
        res.status(200).send({stopped: "stopped"})
    })
    
    return router;
}