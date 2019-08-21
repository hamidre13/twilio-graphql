"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import createApiSpec from ""
const account_model_1 = require("./account.model");
const user_model_1 = require("./../user/user.model");
const tests_1 = require("../../../../tests");
describe('Account', () => {
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
        const dbUsers = await user_model_1.userModel.create(users);
        const accounts = [
            {
                accountName: 'test1',
                accountOwner: dbUsers[0]._id,
                accountEmail: 'account@test.com'
            },
            {
                accountName: 'test2',
                accountOwner: dbUsers[3]._id,
                accountEmail: 'account@test.com'
            },
            {
                accountName: 'test3',
                accountOwner: dbUsers[1]._id,
                accountEmail: 'account@test.com'
            }
        ];
        await account_model_1.accountModel.create(accounts);
        const { data, errors } = await tests_1.runQuery(`{
        getAllAccounts(input:{limit:3,offset:0}) {
          accounts{
            accountName
            accountEmail
          }
          total
        }
      }`, {}, { accountModel: account_model_1.accountModel });
        expect(errors).toBeUndefined();
        expect(data).tobeobject;
        const tempAccount = accounts.map(us => {
            return { accountName: us.accountName, accountEmail: us.accountEmail };
        });
        expect(data.getAllAccounts.accounts).toEqual(expect.arrayContaining(tempAccount));
    });
    it('should get one account', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const accounts = {
            accountName: 'test1',
            accountOwner: val._id + '',
            accountEmail: 'account@test.com'
        };
        const dbAccount = await account_model_1.accountModel.create(accounts);
        const query = `query usr($input:AccountIdInput!){
         getAccount(input:$input) {
            accountName
            accountEmail
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: dbAccount._id + '' } }, { accountModel: account_model_1.accountModel });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.getAccount).toEqual({
            accountEmail: accounts.accountEmail,
            accountName: accounts.accountName,
            id: dbAccount._id + ''
        });
    });
    it('should create one account', async () => {
        const user = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(user);
        const account = {
            accountName: 'test1',
            accountOwner: user.userName,
            accountEmail: 'account@test.com'
        };
        const query = `mutation usr($input:NewAccount!){
         createAccount(input:$input) {
            accountName
            accountEmail
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                accountName: account.accountName,
                accountOwner: account.accountOwner,
                accountEmail: account.accountEmail
            }
        }, { accountModel: account_model_1.accountModel, userModel: user_model_1.userModel });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.createAccount.accountName).toEqual(account.accountName);
        expect(result.data.createAccount.accountEmail).toEqual(account.accountEmail);
    });
    it('should fail to get one fake account', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const accounts = {
            accountName: 'test1',
            accountOwner: val._id + '',
            accountEmail: 'account@test.com'
        };
        const dbAccount = await account_model_1.accountModel.create(accounts);
        const query = `query usr($input:AccountIdInput!){
         getAccount(input:$input) {
            accountName
            accountEmail
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: val._id + '3' } }, { accountModel: account_model_1.accountModel });
        expect(result.errors).toBeDefined();
        expect(result.data).toBeNull;
    });
    it('should update one account', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const accounts = {
            accountName: 'test1',
            accountOwner: val._id + '',
            accountEmail: 'account@test.com'
        };
        const dbAccount = await account_model_1.accountModel.create(accounts);
        const updateEmail = 'update@sgf.vsdfg';
        const updateName = 'asdfasdfasdfasdfas$%G4';
        const query = `mutation usr($input:UpdateAccount!){
         updateAccount(input:$input) {
           accountName
            accountEmail
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                id: dbAccount._id + '',
                accountEmail: updateEmail,
                accountName: updateName
            }
        }, { accountModel: account_model_1.accountModel });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.updateAccount.accountEmail).toEqual(updateEmail);
        expect(result.data.updateAccount.accountName).toEqual(updateName);
    });
    it('should fail to update one fake  account', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const accounts = {
            accountName: 'test1',
            accountOwner: val._id + '',
            accountEmail: 'account@test.com'
        };
        const dbAccount = await account_model_1.accountModel.create(accounts);
        const updateEmail = 'update@sgf.vsdfg';
        const updateName = 'asdfasdfasdfasdfas$%G4';
        const query = `mutation usr($input:UpdateAccount!){
         updateAccount(input:$input) {
           accountName
            accountEmail
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                id: dbAccount._id + '56',
                accountEmail: updateEmail,
                accountName: updateName
            }
        }, { accountModel: account_model_1.accountModel });
        expect(result.errors).toBeDefined();
        expect(result.data).toBeNull;
    });
    it('should delete one account', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const accounts = {
            accountName: 'test1',
            accountOwner: val._id + '',
            accountEmail: 'account@test.com'
        };
        const dbAccount = await account_model_1.accountModel.create(accounts);
        const query = `mutation usr($input:DeleteAccount!){
         deleteAccount(input:$input) {
            err
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: dbAccount._id + '' } }, { accountModel: account_model_1.accountModel });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.deleteAccount.id).toEqual(dbAccount._id + '');
        expect(result.data.deleteAccount.err).toBe(0);
    });
    it('should fail to delete one fake account', async () => {
        const users = {
            userName: 'Stu1',
            password: '123asdfgKJL$#',
            userEmail: 'test@test.org'
        };
        const val = await user_model_1.userModel.create(users);
        const accounts = {
            accountName: 'test1',
            accountOwner: val._id + '',
            accountEmail: 'account@test.com'
        };
        const dbAccount = await account_model_1.accountModel.create(accounts);
        const query = `mutation usr($input:DeleteAccount!){
         deleteAccount(input:$input) {
            err
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: dbAccount._id + '47' } }, { accountModel: account_model_1.accountModel });
        expect(result.errors).toBeDefined();
        expect(result.data).toBeNull;
    });
});
//# sourceMappingURL=account.spec.js.map