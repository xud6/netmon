export class template_error extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = 'template error';
    }
}

function hello(compiler: string) {
    console.log(`Hello from ${compiler}`);
}
hello("TypeScript");