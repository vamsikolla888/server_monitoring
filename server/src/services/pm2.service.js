import pm2 from "pm2";
import httpStatusCodes from "http-status-codes";


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
async function listProcesses(req, res) {
    const processes = await new Promise(resolve => {
        pm2.connect(err => {
            if(err) {
                logger.error(`Error occurred while connecting to pm2... : ${JSON.stringify(err)}`);
                res.status(httpStatusCodes.BAD_GATEWAY);
                resolve(err);
            }
            pm2.list((err, list) => {
                if(err) {
                    logger.error(`Error occurred while listing pm2... : ${JSON.stringify(err)}`);
                    res.status(httpStatusCodes.BAD_GATEWAY);
                    resolve(err);
                }
                resolve(list);
            })
        })
    })
    res.status(httpStatusCodes.OK);
    console.log("PROCESSES", processes);
    return { processes }
}

export default { listProcesses };