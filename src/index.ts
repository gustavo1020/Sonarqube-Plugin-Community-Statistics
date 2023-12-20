require('dotenv').config()
import { QualityAnalysisByPR } from './models/postgres'
import { addReviewers, addReview, githubInit } from './github'
import { sonarqubeInit } from './sonarqube'
import { generateMessage } from './meesage'
import { insertInto,  postgreInit} from './postgres'

async function main() {
    let sonarData = await sonarqubeInit();
    let msg = await generateMessage(sonarData);
    let githubData = await githubInit();
    console.log(msg);
    // let postgreData = await postgreInit();
    // let postgreInsert = await insertInto(githubData, sonarData);

    // let gh = addReviewers()
    // let hg = addReview(sonarData.project_status.projectStatus.status, msg)
    // let fd = addCommentIssues(sonarData.newIssuesResponse)
    
}

main();