const request = require('supertest');
const app = require('../app')

jest.setTimeout(15000)

const user1 = {
    fullName: 'John',
    email: 'john3@example.com',
    password: "123raj",
    phone: '016'
}

test('should be signup', async () => {
    await request(app).post('/api/signup')
        .send({ fullName: user1.fullName, email: user1.email, password: user1.password, phone: user1.phone })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        // .then(function (err, res) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         console.log(res)

        //     }
        // })
})
test('should be signIn', async () => {
    await request(app).post('/api/signin')
        .send({ email: user1.email, password: user1.password })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        // .then(function (err, res) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         console.log(res)

        //     }
        // })
})

// describe('checking signup route', () => {
//     it('signup data', () => {

//         request(app)
//             .post('/api/signup')
//             .send({ fullName: 'john', email: 'john@example.com', password: "123raj", phone: "016" })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then(function (err, res) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log(res)

//                 }
//             })

//     });

// });


// describe('checking signIn route', () => {

//     it('signIn data', () => {
//         request(app)
//             .post('/api/signin')
//             .send({ email: 'john@example.com', password: "123raj" })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then(function (err, res) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log(res)

//                 }
//             })

//     });

// });