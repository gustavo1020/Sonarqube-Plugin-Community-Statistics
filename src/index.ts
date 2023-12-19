require('dotenv').config()
import { QualityAnalysisByPR } from './models/postgres'
import { addReviewers, addReview, addCommentIssues } from './github'
import { sonarqubeInit } from './sonarqube'
import { generateMessage } from './meesage'

async function main() {
    let sonarData = await sonarqubeInit();
    let msg = await generateMessage(sonarData);
    // let githubData = await githubInit();
    //let gh = addReviewers()
    let hg = addReview("OK", msg)
}

main();