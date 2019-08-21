"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const option_model_1 = require("./option.model");
const tests_1 = require("../../../../tests");
describe('Option', () => {
    beforeAll(tests_1.dbTools.connectToDB);
    beforeEach(tests_1.dbTools.cleanDB);
    afterEach(tests_1.dbTools.cleanDB);
    afterAll(tests_1.dbTools.disconnectDB);
    it('should get all', async () => {
        const options = [
            {
                optionKey: 'Stu1',
                optionValue: '123asdgKJL$#'
            },
            {
                optionKey: 'Stu2',
                optionValue: '13asdfgKJL$#'
            },
            {
                optionKey: 'Stu3',
                optionValue: '123asgKJL$#'
            },
            {
                optionKey: 'Stu4',
                optionValue: '123asdfg#'
            }
        ];
        const dbOptions = await option_model_1.optionModel.create(options);
        const { data, errors } = await tests_1.runQuery(`{
        getAllOptions(input:{limit:4,offset:0}) {
          options{
            optionValue
            optionKey
          }
          
        }
      }`, {}, { Models: { optionModel: option_model_1.optionModel } });
        expect(errors).toBeUndefined();
        expect(data).tobeobject;
        expect(data.getAllOptions.options).toEqual(expect.arrayContaining(options));
    });
    it('should get one option', async () => {
        const option = {
            optionKey: 'Stu1',
            optionValue: '123asdgKJL$#'
        };
        const dbOption = await option_model_1.optionModel.create(option);
        const query = `query usr($input:OptionIdInput!){
         getOption(input:$input) {
           optionKey
           optionValue       
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { key: dbOption.optionKey } }, { Models: { optionModel: option_model_1.optionModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.getOption).toEqual({
            optionKey: option.optionKey,
            optionValue: option.optionValue,
            id: dbOption._id + ''
        });
    });
    it('should create one option', async () => {
        const option = {
            optionKey: 'Stu1',
            optionValue: '123asdgKJL$#'
        };
        const query = `mutation usr($input:CreateOption!){
         createOption(input:$input) {
           optionKey
           optionValue       
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: { optionKey: option.optionKey, optionValue: option.optionValue }
        }, { Models: { optionModel: option_model_1.optionModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.createOption).toEqual({
            optionKey: option.optionKey,
            optionValue: option.optionValue
        });
    });
    it('should fail to get one fake option', async () => {
        const option = {
            optionKey: 'Stu1',
            optionValue: '123asdgKJL$#'
        };
        const dbOption = await option_model_1.optionModel.create(option);
        const query = `query usr($input:OptionIdInput!){
         getOption(input:$input) {
           optionKey
           optionValue       
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { optionKey: 'blah' } }, { Models: { optionModel: option_model_1.optionModel } });
        expect(result.errors).toBeDefined();
        expect(result.data).toBeNull;
    });
    it('should update one option', async () => {
        const option = {
            optionKey: 'Stu1',
            optionValue: '123asdgKJL$#'
        };
        const dbOption = await option_model_1.optionModel.create(option);
        const updatedValue = 'updated';
        const updatedKey = 'newId';
        const query = `mutation usr($input:UpdateOption!){
         updateOption(input:$input) {
           optionKey
           optionValue
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                id: dbOption._id + '',
                optionKey: updatedKey,
                optionValue: updatedValue
            }
        }, { Models: { optionModel: option_model_1.optionModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.updateOption.optionKey).toEqual(updatedKey);
        expect(result.data.updateOption.optionValue).toEqual(updatedValue);
    });
    it('should fail to update one fake option', async () => {
        const option = {
            optionKey: 'Stu1',
            optionValue: '123asdgKJL$#'
        };
        const dbOption = await option_model_1.optionModel.create(option);
        const updatedValue = 'updated';
        const updatedId = 'newId';
        const query = `mutation usr($input:UpdateOption!){
         updateOption(input:$input) {
           optionKey
           optionValue
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                id: dbOption._id + '45',
                optionKey: updatedId,
                optionValue: updatedValue
            }
        }, { Models: { optionModel: option_model_1.optionModel } });
        expect(result.errors).toBeDefined();
        expect(result.data).toBeNull;
    });
    it('should delete one option', async () => {
        const option = {
            optionKey: 'Stu1',
            optionValue: '123asdgKJL$#'
        };
        const dbOption = await option_model_1.optionModel.create(option);
        const query = `mutation usr($input:DeleteOption!){
         deleteOption(input:$input) {
            err
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: dbOption._id + '' } }, { Models: { optionModel: option_model_1.optionModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.deleteOption.id).toEqual(dbOption._id + '');
        expect(result.data.deleteOption.err).toBe(0);
    });
    it('should fail to delete one fake option', async () => {
        const option = {
            optionKey: 'Stu1',
            optionValue: '123asdgKJL$#'
        };
        const dbOption = await option_model_1.optionModel.create(option);
        const query = `mutation usr($input:DeleteOption!){
         deleteOption(input:$input) {
            err
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: dbOption._id + '645' } }, { Models: { optionModel: option_model_1.optionModel } });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.deleteOption.id).not.toEqual(dbOption.id);
        expect(result.data.deleteOption.err).not.toBe(0);
    });
});
//# sourceMappingURL=option.spec.js.map