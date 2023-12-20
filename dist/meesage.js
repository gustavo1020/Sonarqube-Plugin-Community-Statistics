"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = void 0;
function generateMessage(sonarqubeData) {
    var _a, _b, _c, _d;
    return `## Quality Gate ${sonarqubeData.project_status.projectStatus.status == "OK" ? "Passed" : "Failed"}   ${searchPath(sonarqubeData.project_status.projectStatus.status == "OK" ? "approv" : "rejected")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![sonarqube 256x63 (1)](https://github.com/gustavo1020/-release-version-/assets/49031933/27434a7b-6a02-4686-a96a-57ecc73d5a85) &nbsp;&nbsp;  x  &nbsp;&nbsp;![c54422d50dc06739a00342935698799b (1)](https://github.com/gustavo1020/-release-version-/assets/49031933/0b02d722-ec4e-4397-b4c7-18108e8efba5)

### Additional information
*The following metrics might not affect the Quality Gate status but improving them will improve your project code quality.*
    
### Issues
    
${searchPath("bug")} ${searchPath(searchSecurity(sonarqubeData.measure, "new_reliability_rating"))} **${searchIssuesCount(sonarqubeData.newIssuesResponse.facets, "BUG")}** **Bugs**

${searchPath("vulnerability")} ${searchPath(searchSecurity(sonarqubeData.measure, "new_security_rating"))} **${searchIssuesCount(sonarqubeData.newIssuesResponse.facets, "VULNERABILITY")}** **Vulnerabilities**

${searchPath("codeSmell")} ${searchPath(searchSecurity(sonarqubeData.measure, "new_maintainability_rating"))} **${searchIssuesCount(sonarqubeData.newIssuesResponse.facets, "CODE_SMELL")}** **Code Smells**

### Converage and Duplications

${duplicatedIcon(Number(((_a = sonarqubeData.measure.find(x => x.metric == "new_coverage")) === null || _a === void 0 ? void 0 : _a.period.value) || "0"))} **Coverage** **${(_b = sonarqubeData.measure.find(x => x.metric == "new_coverage")) === null || _b === void 0 ? void 0 : _b.period.value}**

${coverageIcon(Number(((_c = sonarqubeData.measure.find(x => x.metric == "new_duplicated_lines_density")) === null || _c === void 0 ? void 0 : _c.period.value) || "0"))} **Duplication** **${(_d = sonarqubeData.measure.find(x => x.metric == "new_duplicated_lines_density")) === null || _d === void 0 ? void 0 : _d.period.value}**

   `;
}
exports.generateMessage = generateMessage;
function searchPath(value) {
    return `![${value}](https://raw.githubusercontent.com/gustavo1020/Sonarqube-Plugin-Community-Statistics/main/img/${value}.png)`;
}
function searchSecurity(value, search) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (search == "new_reliability_rating")
        return "security_" + searchSecurityValue(((_b = (_a = value.find(x => x.metric == search)) === null || _a === void 0 ? void 0 : _a.period) === null || _b === void 0 ? void 0 : _b.value) || "5.0");
    if (search == "new_maintainability_rating")
        return "security_" + searchSecurityValue(((_d = (_c = value.find(x => x.metric == search)) === null || _c === void 0 ? void 0 : _c.period) === null || _d === void 0 ? void 0 : _d.value) || "5.0");
    if (search == "new_security_rating")
        return "security_" + searchSecurityValue(((_f = (_e = value.find(x => x.metric == search)) === null || _e === void 0 ? void 0 : _e.period) === null || _f === void 0 ? void 0 : _f.value) || "5.0");
    if (search == "new_security_review_rating")
        return "security_" + searchSecurityValue(((_h = (_g = value.find(x => x.metric == search)) === null || _g === void 0 ? void 0 : _g.period) === null || _h === void 0 ? void 0 : _h.value) || "5.0");
    return "security_E";
}
function searchSecurityValue(value) {
    if (value == "1.0")
        return "A";
    if (value == "2.0")
        return "B";
    if (value == "3.0")
        return "C";
    if (value == "4.0")
        return "D";
    if (value == "5.0")
        return "E";
    return "E";
}
function searchIssuesCount(value, search) {
    var _a, _b;
    return ((_b = (_a = value.find(x => x.property == "types")) === null || _a === void 0 ? void 0 : _a.values.find(z => z.val == search)) === null || _b === void 0 ? void 0 : _b.count) || 0;
}
function duplicatedIcon(duplicatedCode) {
    if (duplicatedCode < 3) {
        return searchPath("duplication_lt_3");
    }
    if (duplicatedCode < 5) {
        return searchPath("duplication_3_5");
    }
    if (duplicatedCode < 10) {
        return searchPath("duplication_5_10");
    }
    if (duplicatedCode < 20) {
        return searchPath("duplication_10_20");
    }
    return searchPath("duplication_lt_3");
}
function coverageIcon(coverage) {
    if (coverage <= 0) {
        return searchPath("duplication_lt_3");
    }
    if (coverage < 50) {
        return searchPath("coverage_lt_50");
    }
    if (coverage < 80) {
        return searchPath("coverage_gt_50");
    }
    return searchPath("coverage_gt_80");
}
