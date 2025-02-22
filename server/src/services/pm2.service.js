import pm2 from "pm2";

async function listProcesses() {
    pm2.connect(err => {
        if(err) logger.error(`Error Occurred ${JSON.stringify(err)}`);
        pm2.list((err, processList) => {
            if(err) logger.error(`Error Occured while listing pm2 process ${JSON.stringify(err)}`);
            else {
                console.log("PROCESS LIST", JSON.stringify(processList));
            }
        })
    })
}

// listProcesses();