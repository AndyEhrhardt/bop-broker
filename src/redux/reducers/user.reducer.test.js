import userReducer from './src/redux/reducers/user.reducer';


describe('user reducer tests', () => {
    test('The default value is an empty object.', (done) => {
        let action ={};
        let output = userReducer(undefined, action);
        expect(output).objectContaining({});
        expect(output).toBeDefinted();
    });
});