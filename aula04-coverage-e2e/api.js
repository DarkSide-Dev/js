const { once } = require('events');
const http = require('http')
const DEFAULT_USER = { username: "DarksideDev", password: "123" }

const routes = {

    '/contact:get': (request, response) => {
        response.write('Contact us page')
        return response.end();
    },
    '/login:post': async (request, response) => {
        // Response é um iterator!

        const user = JSON.parse(await once(request, 'data'))
        const toLower = text => text.toLowerCase();

        if (toLower(user.username) !== toLower(DEFAULT_USER.username) || toLower(user.password) !== toLower(DEFAULT_USER.password)) {
            response.writeHead(401)
            response.write("Logging failed!")
            return response.end()
        }

        response.write("Loggin has succeeded!")
        return response.end()
    },
    default: (request, response) => {
        response.write('Hello World!')
        return response.end();
    }

}

const handler = (request, response) => {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLowerCase()}`;

    const chosen = routes[routeKey] || routes.default;
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    return chosen(request, response)
}

const app = http.createServer(handler)
    .listen(3000, () => console.log('App running at', 3000))

module.exports = app