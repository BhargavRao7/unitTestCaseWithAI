const helloWorld = () => 'Hello, World!';

describe('Hello World Function', () => {
    it('should return "Hello, World!"', () => {
        expect(helloWorld()).toBe('Hello, World!');
    });
});