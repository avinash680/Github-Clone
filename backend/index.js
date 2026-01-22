const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
 const {  addRepo  } = require("./controllers/add");
 const { commitRepo } = require("./controllers/commit");
 const { pullRepo } = require("./controllers/pull");
 const { revertRepo } = require("./controllers/revert");
 const { pushRepo } = require("./controllers/push");
 
 
 
 
 yargs(hideBin(process.argv)).command("init", "Initialise a new repository", 
    {},initRepo)
    .command("add <file>", "add a file to the repository", 
    (yargs) => {yargs.positional("file", {
        describe: "File to add staging area", type: "string",
    });
},
 (argv) => {
    addRepo(argv.file);
 })
  

.command("commit <message>", "Commit the staged file", 
    (yargs) => {yargs.positional("message", {
        describe: "Commit message", type: "string",
    });
},(argv) => {
    commitRepo(argv.message);
 })



 .command("push", "Push commit to S3", {}, pushRepo)
 .command("pull", "Pull commit form S3", {}, pullRepo)
 .command("revert <cmmitID>",
    "Revert to a specific commit",
 (yargs) => {yargs.positional("commitID", {
        describe: "Commit Id to revert to " , type: "string",
    });
},revertRepo)
  
 .demandCommand(1, "you need at list one command").help().argv;

