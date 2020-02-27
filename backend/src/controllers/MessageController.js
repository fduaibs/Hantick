const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: '2019-02-28',
    authenticator: new IamAuthenticator({
      apikey: 'd5_THJe_nm7ZI0OUtfE6fMgeBlW9L8IvJDtLfS28HeDz'
    })
  });

const assistantId = '8b1d1595-e3ee-4eee-b300-17b23bf414d2';

module.exports = {
    async store(request, response) {
        const { text, sessionId } = request.body;
        let message;

        const params = {
            assistantId,
            sessionId,
            input: { text },
        }
        assistant.message(params).then(res => {
          response.json(res.result.output.generic);
          message = res.result.output.generic[0].text;
        }).catch(err => {
            response.status(500).json(err);
        });
        return message;
    }
}