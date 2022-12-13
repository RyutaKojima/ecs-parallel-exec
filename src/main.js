import process from 'node:process';
import { program } from "commander";
import {ecsExec, getTaskArns} from "./services/ecs-utils.js";

program
    .name('node main.js')
    .description('AWS ECS の指定サービスの全てのタスクに対してコマンドを実行します')
    .version('0.0.1')
    .argument('<clusterName>', 'ECS cluster name')
    .argument('<serviceName>', 'ECS service name')
    .argument('<command>', '各タスクコンテナで実行するコマンド')
    .option('--one', '最初に見つかったタスクのみで実行する')
    .parse(process.argv);

const options = program.opts();

const clusterName = program.args[0];
const serviceName = program.args[1];
const command = program.args[2];

const onlyOneTask = options.one ?? false;

(async () => {
    const taskArns = await getTaskArns(clusterName, serviceName)

    const targetArns = onlyOneTask ? [taskArns[0]] : taskArns;

    targetArns.forEach((taskArn) => {
        ecsExec(clusterName, taskArn, command)

    });
})();
