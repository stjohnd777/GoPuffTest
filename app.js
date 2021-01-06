const { createService } = require("./src/gopuff/stem");


async function main() {

    const app = await createService();

    let http = require('http');

    let server = http.createServer(app);

    server.listen(3000, () => {
        console.log('started on 3000')
    });
}

main();

