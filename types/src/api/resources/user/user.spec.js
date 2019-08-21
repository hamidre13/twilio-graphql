"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import createApiSpec from ""
const user_model_1 = require("./user.model");
const tests_1 = require("../../../../tests");
describe('User', () => {
    beforeAll(tests_1.dbTools.connectToDB);
    beforeEach(tests_1.dbTools.cleanDB);
    afterEach(tests_1.dbTools.cleanDB);
    afterAll(tests_1.dbTools.disconnectDB);
    it('should get all', async () => {
        const users = [
            {
                userName: 'Stu1',
                password: '123asdfgKJL$#',
                userEmail: 'test@test.org'
            },
            {
                userName: 'Stu2',
                password: '123asdfgKJL$#',
                userEmail: 'test23@test.org'
            },
            {
                userName: 'Stu3',
                password: '123asdfgKJL$#',
                userEmail: 'testgfd@test.org'
            },
            {
                userName: 'Stu4',
                password: '123asdfgKJL$#',
                userEmail: 'testgsdf@test.org'
            }
        ];
        await user_model_1.userModel.create(users);
        const { data, errors } = await tests_1.runQuery(`{
        getAllUsers(input:{limit:4,offset:0}) {
          users{
            userName
            userEmail
          }
        }
      }`, {}, { Models: { userModel: user_model_1.userModel } });
        expect(errors).toBeUndefined();
        expect(data).tobeobject;
        const tempUser = users.map(us => {
            return { userName: us.userName, userEmail: us.userEmail };
        });
        expect(data.getAllUsers.users).toEqual(expect.arrayContaining(tempUser));
    });
    it('should get one user', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const query = `query usr($input:UserIdInput!){
         getUser(input:$input) {
            userName
            userEmail
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: val.id } }, { Models: { userModel: user_model_1.userModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.getUser).toEqual({
            userEmail: users.userEmail,
            userName: users.userName,
            id: val.id
        });
    });
    it('should create one user', async () => {
        const user = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const query = `mutation usr($input:NewUser!){
         createUser(input:$input) {
            userName
            userEmail
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                userName: user.userName,
                userEmail: user.userEmail,
                password: user.password
            }
        }, { Models: { userModel: user_model_1.userModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.createUser.userName).toEqual(user.userName);
    });
    it('should check exciting username', async () => {
        const users = [
            {
                userName: 'Stu1',
                password: '123asdfgKJL$#',
                userEmail: 'test@test.org'
            },
            {
                userName: 'Stu2',
                password: '123asdfgKJL$#',
                userEmail: 'test23@test.org'
            }
        ];
        await user_model_1.userModel.create(users);
        const query = `query usr($input:CheckUser!){
         isUser(input:$input) 
       }`;
        const result = await tests_1.runQuery(query, { input: { userName: 'Stu1' } }, { Models: { userModel: user_model_1.userModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.isUser).toBeTruthy();
    });
    it('should check non exciting username', async () => {
        const users = [
            {
                userName: 'Stu1',
                password: '123asdfgKJL$#',
                userEmail: 'test@test.org'
            },
            {
                userName: 'Stu2',
                password: '123asdfgKJL$#',
                userEmail: 'test23@test.org'
            }
        ];
        await user_model_1.userModel.create(users);
        const query = `query usr($input:CheckUser!){
         isUser(input:$input) 
       }`;
        const result = await tests_1.runQuery(query, { input: { userName: 'null' } }, { Models: { userModel: user_model_1.userModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.isUser).toBeFalsy();
    });
    it('should update one user', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const updateEmail = 'update@sgf.vsdfg';
        const updatePassword = 'asdfasdfasdfasdfas$%G4';
        const query = `mutation usr($input:UpdateUser!){
         updateUser(input:$input) {
            userName
            userEmail
            id
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                id: val.id,
                userEmail: updateEmail,
                password: updatePassword
            }
        }, { Models: { userModel: user_model_1.userModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.updateUser.userEmail).toEqual(updateEmail);
        expect(result.data.updateUser.password).not.toEqual(val.password);
    });
    it('should fail to update one fake user', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const updateEmail = 'update@sgf.vsdfg';
        const updatePassword = 'asdfasdfasdfasdfas$%G4';
        const query = `mutation usr($input:UpdateUser!){
         updateUser(input:$input) {
            userName
            userEmail
            id
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                id: 456564,
                userEmail: updateEmail,
                password: updatePassword
            }
        }, { Models: { userModel: user_model_1.userModel } });
        expect(result.errors).toBeDefined();
        expect(result.data).tobeNull;
    });
    it('should delete one user', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const query = `mutation usr($input:DeleteUser!){
         deleteUser(input:$input) {
            err
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: val._id + '' } }, { Models: { userModel: user_model_1.userModel, userMeta: user_model_1.userMeta } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.deleteUser.id).toEqual(val.id);
        expect(result.data.deleteUser.err).toBe(0);
    });
    it('should fail to delete fictional user', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const query = `mutation usr($input:DeleteUser!){
         deleteUser(input:$input) {
            err
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: '1234' } }, { Models: { userModel: user_model_1.userModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.deleteUser.id).not.toEqual(val.id);
        expect(result.data.deleteUser.err).not.toBe(0);
    });
});
//# sourceMappingURL=user.spec.js.map