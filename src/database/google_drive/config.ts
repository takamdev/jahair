import {google} from "googleapis"

const CLIENT_ID="437994101250-auhf47qe0ctg1n2gl49i8dup9iapjgp8.apps.googleusercontent.com"
const CLIENT_SECRET="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"
const REDIRECT_URI="https://developers.google.com/oauthplayground"
const REFRESH_TOKEN="1//04u4F6aUiwqlGCgYIARAAGAQSNwF-L9Ir_mCivqg1PxH84JhJ0hcosaR-GLITmCY0dWdSayPmNQ4maBIJhz3QJTuuN6qWVrA-aC4"



const oauthclient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauthclient.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version:"v3",
    auth:oauthclient
})


// upload file

export const uploadFile = async ()=>{
    try {
        const response = await drive.files.create({
            requestBody:{
                name:"text",
                mimeType:"text/plan"
            },
            media:{
                mimeType:"text/plan",
                body:"hello world"
            }
        })

        console.log(response.data);
        
    } catch (error) {
        console.log(error);
        
    }
}
