import {login, logout} from '../../actions/auth';

test('should return login object', ()=>{
    const uid='123456789abcdefg';
    const action = login(uid);
    expect(action).toEqual({
        type:'LOGIN',
        uid
    });
});


test('should return logout object', ()=>{
    const action = logout();
    expect(action).toEqual({
        type:'LOGOUT'
    });
});