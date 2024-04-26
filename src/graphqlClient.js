import {GraphQLClient} from 'graphql-request'

const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY;
const url = 'https://sitiomarino.us-east-a.ibm.stepzen.net/api/chest-exercises/graphql';
const client = new GraphQLClient(url, 
    {headers: {
        Authorization: "apikey sitiomarino::local.net+1000::900f3cc8928f1a383d2b220c1f39675dbc94094270ea1c2d617bd71d8a9d8e16",
}});

export default client;