import authReducer from '../../reducers/auth';

test('should set uid for login', ()=>{
    const testObject={
        type: 'LOGIN',
        uid: '123456789abcdef'
    };

    const result = authReducer({}, testObject);
    expect(result.uid).toEqual(testObject.uid);
});


test('should clear the uid when logout', ()=>{
    const testObject={
        type: 'LOGIN'
    };

    const result = authReducer({}, testObject);
    expect(result).toEqual({});  
});

test('should test the default value', ()=>{
    const testObject={
        type: 'TEST',
        uid: '123456789abcdef'
    };

    const result = authReducer({}, testObject);
    expect(result).toEqual({});
});