import {exec, spawn} from 'node:child_process';
import {promisify} from 'node:util';
import {last} from './array-utils.js';

const promiseExec = promisify(exec);

export const getTaskArns = async (clusterName, serviceName) => {
    const listTasksCommand = `aws ecs list-tasks --cluster ${clusterName} --service-name ${serviceName}`

    const {stdout} = await promiseExec(listTasksCommand);

    return JSON.parse(stdout)?.taskArns ?? []
};

export const ecsExec = async (clusterName, taskArn, command) => {
    const taskId = last(taskArn.split('/'));

    const {stdout} = spawn('sh', [
        '-c',
        `aws ecs execute-command --interactive --cluster=${clusterName} --task=${taskArn} --command="${command}"`,
    ]);

    stdout.on('data', (data) => {
        console.log(`${taskId}: ${data}`);
    });
};
