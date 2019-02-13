module.exports = (path, stop, cb) => {
    const chokidar = require('chokidar') 
    console.log(path);
    var watcher = chokidar.watch(path, {
        ignored: /(^|[\/\\])\../,
        persistent: true
    });

    if(path && !stop){
        const log = msg => {
            cb(msg);
        }

        watcher
        .on('add', path => log(`File ${path} has been added`))
        .on('change', path => log(`File ${path} has been changed`))
        .on('unlink', path => log(`File ${path} has been removed`));
        
        // More possible events.
        watcher
        .on('addDir', path => log(`Directory ${path} has been added`))
        .on('unlinkDir', path => log(`Directory ${path} has been removed`))
        .on('error', error => log(`Watcher error: ${error}`))
        .on('ready', () => log('Initial scan complete. Ready for changes'))
        .on('raw', (event, path, details) => {
            log('Raw event info:', event, path, details);
        });
    } else {
        console.log(path);
        watcher.close();
    }
    return watcher;
}