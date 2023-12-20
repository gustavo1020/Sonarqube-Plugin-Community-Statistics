"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const github_1 = require("./github");
const sonarqube_1 = require("./sonarqube");
const meesage_1 = require("./meesage");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let sonarData = yield (0, sonarqube_1.sonarqubeInit)();
        let msg = yield (0, meesage_1.generateMessage)(sonarData);
        let githubData = yield (0, github_1.githubInit)();
        console.log(msg);
        // let postgreData = await postgreInit();
        // let postgreInsert = await insertInto(githubData, sonarData);
        // let gh = addReviewers()
        // let hg = addReview(sonarData.project_status.projectStatus.status, msg)
        // let fd = addCommentIssues(sonarData.newIssuesResponse)
    });
}
main();
