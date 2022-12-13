# Usage

※ aws-cliがインストール、セットアップされている必要があります

node main.js --help
node maiin.js <clusterName> <serviceName> <command>

指定したECSサービスの全てのタスクに対してコマンドを実行します。

`--one` オプションを指定した場合は、1つのタスクに対してだけコマンドを実行します。
