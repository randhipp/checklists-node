// Import the dependencies for testing

var chai = require('chai');
var chaiHttp = require('chai-http');
// var app = 'http://localhost:3000/api/v1/checklists';

const app = require('./../bin/www');
let ObjectID = require('mongodb').ObjectID;
// Configure chai


// (node:17643) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' 
// makes TLS connections and HTTPS requests insecure by disabling certificate verification.
// https://stackoverflow.com/questions/41572681/set-accepted-ca-list-and-ignore-ssl-errors-with-chai-http
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


chai.use(chaiHttp);
chai.use(require('chai-json-schema'));


var allSchema = require('./schema/item/all.json');
var oneItemSchema = require('./schema/item/one.json');
var allAvailableSchema = require('./schema/item/all-available.json');

var oneCollectionSchema = require('./schema/checklist/one.json');

let token = '6d7f3f6e-269c-4e1b-abf8-9a0add479511';
const id = '5fbdaca30aac033c531ddb7a';
const itemId = '5fbdaec179ebb641e20f6e64';

chai.should();

describe("Items API Test", () => {
    describe(`GET - /api/v1/checklists/items`, function() {
        this.timeout(3000);
        // Test to get all items
        it("Should return unauthorized if no token or wrong token", (done) => {
            chai.request(app)
                .get(`/api/v1/checklists/items`)
                .set({ "Authorization": `Bearer ` })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                 });
        });
        it("Should get all items", (done) => {
            chai.request(app)
                 .get(`/api/v1/checklists/items`)
                 .set({ "Authorization": `Bearer ${token}` })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.jsonSchema(allSchema);
                     done();
                  });
        });

    });
    
    describe(`GET - /api/v1/checklists/${id}/items`, function () {
        before(function(done) {
            this.timeout(3000); // A very long environment setup.
            setTimeout(done, 2500);
        });
        // Test to get all item records for given checklist id
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
                     res.body.should.be.jsonSchema(oneCollectionSchema);
                     done();
                  });
        });
        it("Should return 404 if given checklist id was not found.", (done) => {
            chai.request(app)
                .get(`/api/v1/checklists/1312312312312/items`)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                 });
       });

    });

    describe(`GET - /api/v1/checklists/${id}/items/${itemId}`, function () {
        before(function(done) {
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

    describe(`POST - /api/v1/checklists/${id}/items/`, function () {
        before(function(done) {
            this.timeout(3000); // A very long environment setup.
            setTimeout(done, 2500);
        });
        it("Should return unauthorized if no token or wrong token", (done) => {
            chai.request(app)
                .post(`/api/v1/checklists/${id}/items`)
                .set({ "Authorization": `Bearer ` })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
        it("Should insert new record", (done) => {
            chai.request(app)
                .post(`/api/v1/checklists/${id}/items`)
                .set({ "Authorization": `Bearer ${token}` })
                .set('content-type', 'application/json')
                .send({
                    "data": {
                      "attribute": {
                        "description": "78678678 Need to verify this guy house.",
                        "due": "2020-11-25 10:34:51",
                        "urgency": "2",
                        "assignee_id": new ObjectID()
                      }
                    }
                  })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.jsonSchema(oneItemSchema);
                    done();
                });
        });
        it("Should not insert new record, data is missing", (done) => {
            chai.request(app)
                .post(`/api/v1/checklists/${id}/items`)
                .set({ "Authorization": `Bearer ${token}` })
                .set('content-type', 'application/json')
                .send({
                   
                  })
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
        it("Should not insert new record, data.attribute is missing", (done) => {
            chai.request(app)
                .post(`/api/v1/checklists/${id}/items`)
                .set({ "Authorization": `Bearer ${token}` })
                .set('content-type', 'application/json')
                .send({
                    "data": {
                        "attribute": {
                          
                        }
                      }
                  })
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
        it("Should not insert new record, data.attribute invalid or missing some fields", (done) => {
            chai.request(app)
                .post(`/api/v1/checklists/${id}/items`)
                .set({ "Authorization": `Bearer ${token}` })
                .set('content-type', 'application/json')
                .send({
                    "data": {
                        "attribute": {
                          "description": "78678678 Need to verify this guy house.",
                          "urgency": "2",
                          "assignee_id": new ObjectID()
                        }
                      }
                  })
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });
});

