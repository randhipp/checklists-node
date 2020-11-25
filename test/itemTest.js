// Import the dependencies for testing

var chai = require('chai');
var chaiHttp = require('chai-http');
const { exists } = require('../model/items');
// var app = 'http://localhost:3000/api/v1/checklists';

const app = require('./../bin/www');

// Configure chai


// (node:17643) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' 
// makes TLS connections and HTTPS requests insecure by disabling certificate verification.
// https://stackoverflow.com/questions/41572681/set-accepted-ca-list-and-ignore-ssl-errors-with-chai-http
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


chai.use(chaiHttp);
chai.use(require('chai-json-schema'));

var oneItemSchema = require('./schema/item/one.json');
var allAvailableSchema = require('./schema/item/all-available.json');

let token = '6d7f3f6e-269c-4e1b-abf8-9a0add479511';
var id = "5fbdaca30aac033c531ddb7a";
var itemId = "5fbdaec179ebb641e20f6e64"

chai.should();

describe("Items API Test", () => {
    describe(`/api/v1/checklists/${id}/items`, () => {
        // Test to get single item record
        it("Should return unauthorized if no token or wrong token", (done) => {
            chai.request(app)
                .get(`/api/v1/checklists/${id}/items`)
                .set({ "Authorization": `Bearer ` })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                 });
        });
        it("Should get all item records for given checklist", (done) => {
             chai.request(app)
                 .get(`/api/v1/checklists/${id}/items`)
                 .set({ "Authorization": `Bearer ${token}` })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.jsonSchema(allAvailableSchema);
                     done();
                  });
        });

    });

    describe(`/api/v1/checklists/${id}/items/${itemId}`, () => {
        // Test to get single item record
        beforeEach(function(done) {
            this.timeout(3000); // A very long environment setup.
            setTimeout(done, 2500);
        });
        it("Should return unauthorized if no token or wrong token", (done) => {
            chai.request(app)
                .get(`/api/v1/checklists/${id}/items/${itemId}`)
                .set({ "Authorization": `Bearer ` })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
        it("Should get one item record for given checklist", (done) => {
            chai.request(app)
                .get(`/api/v1/checklists/${id}/items/${itemId}`)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.jsonSchema(oneItemSchema);
                    done();
                });
        });
    });
});

