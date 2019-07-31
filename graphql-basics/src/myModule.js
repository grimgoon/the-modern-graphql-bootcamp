const message = 'Some message from myModule.js';

const getGreeting = (name) => {
    return `Welcome to the course ${name}`;
}

export {
    getGreeting,
    message as default
}