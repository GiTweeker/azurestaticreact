import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function MessageFn(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';
    return { jsonBody: {'text': `Hello, ${name}!`} };
};

app.http('MessageFn', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: MessageFn
});
