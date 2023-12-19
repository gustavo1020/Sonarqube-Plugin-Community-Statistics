require('dotenv').config()
import axios from 'axios';
import { PullRequestDataCommits, UserAlias } from './models/github'

const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'valor_predeterminado'
// const usersAlias: UserAlias[] = process.env.GITHUB_USERS || 'valor_predeterminado'
const GITHUB_PULL_REQUEST = process.env.GITHUB_PULL_REQUEST || 'valor_predeterminado'
const GITHUB_BRANCH: string = process.env.GITHUB_BRANCH || 'valor_predeterminado'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN 
const GTIHUB_USER_REVIEW: string = process.env.GTIHUB_USER_REVIEW || 'valor_predeterminado'
const BASE_URL = "https://api.github.com"
const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };




// export async function githubInit(): Promise<PullRequestDataCommits>{
//     const pull_request_commits_response = await axios.get<PullRequestDataCommits[]>(BASE_URL + `/repos/${GITHUB_REPOSITORY}/pulls/${GITHUB_PULL_REQUEST}/commits`, { headers })

//     const pull_request_reponse  = await axios.get(BASE_URL + `/repos/${GITHUB_REPOSITORY}/pulls/${GITHUB_PULL_REQUEST}`, { headers })

//     const githubData : PullRequestDataCommits = { title : pull_request_reponse.data.title, author : pull_request_reponse.data.user.login, amount : pull_request_commits_response.data.length,
//     branch: GITHUB_BRANCH, repository: GITHUB_REPOSITORY, numberPR: GITHUB_PULL_REQUEST, team: usersAlias.find(x => x.github == pull_request_reponse.data.user.login)?.team || 'valor_predeterminado'}

//     return githubData
// }


// funciona 
export async function addReviewers(){
    const requestBody = {
        reviewers: [GTIHUB_USER_REVIEW],
    };

    const review = axios.post(BASE_URL + `/repos/${GITHUB_REPOSITORY}/pulls/${GITHUB_PULL_REQUEST}/requested_reviewers`, requestBody, { headers })
    .then((response) => {
      console.log(`Usuario ${GTIHUB_USER_REVIEW} agregado como revisor al PR.`);
    })
    .catch((error) => {
      console.error('Error al agregar como revisor:', error.response?.data || error.message);
    });
}

export async function addReview(value : string, message : string){
    const reviewBody = {
        event: `${value == "OK" ? "COMMENT" : "REQUEST_CHANGES"}`,
        body: message,
    };

    const review = axios.post(BASE_URL + `/repos/${GITHUB_REPOSITORY}/pulls/${GITHUB_PULL_REQUEST}/reviews`, reviewBody, { headers })
    .then((response) => {
        console.log('Pull request aprobado con éxito y mensaje enviado.');
    })
      .catch((error) => {
        console.error('Error al aprobar el pull request:', error.response?.data || error.message);
    });
}

export async function addCommentIssues(){

    const commentBody = {
        body: 'Este es mi comentario sobre las líneas de código.',
        path: 'ruta/del/archivo.txt',
        position: 1,
    };

    const review = axios.post(BASE_URL + `/repos/${GITHUB_REPOSITORY}/pulls/${GITHUB_PULL_REQUEST}/comments`, commentBody, { headers })
    .then((response) => {
        console.log('Comentario agregado con éxito al pull request.');
    })
    .catch((error) => {
        console.error('Error al agregar el comentario al pull request:', error.response?.data || error.message);
    });
}
