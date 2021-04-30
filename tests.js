var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


// test for GET	/posts
testCase('GET /posts', function(){
      it('it should GET all posts', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(100);
                console.log(res.body.slice(0,3));
                done();
            });
      });
  });


//tests for GET	/posts/:id - please create several tests (7 tests or more)
testCase('GET /posts/:id', function(){
  const postId = 25;
  const wrongPostId = "wrong";
  const userId = 3;
  const title = "rem alias distinctio quo quis";
  it('it should GET a post by ID', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get('/posts/' + postId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body['id'].should.be.a('number');
          res.body['userId'].should.be.a('number');
          res.body['title'].should.be.a('string');
          res.body['body'].should.be.a('string');
          res.body.should.have.property('id').eql(postId);
          console.log(res.body);
          done();
        });
    });
  it('it should GET posts by USERID', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get('/posts?userId=' + userId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          console.log(res.body.slice(0,3));
          done();
        });
    });
  it('it should GET a post by TITLE', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get(`/posts?title=${title}`)
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          done();
        });
    });
  it('it should GET a post by ID and USERID', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get(`/posts?id=${postId}&userId=${userId}`)
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          done();
        });
    });
  it('it should GET a post by ID and TITLE', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get(`/posts?id=${postId}&title=${title}`)
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          done();
        });
    });
  it('it should GET a post by USERID and TITLE', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get(`/posts?userId=${userId}&title${title}`)
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          done();
        });
    });
  it('it should GET a post by ID and USERID', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get(`/posts?id=${postId}&userId=${userId}`)
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          done();
        });
    });
  it('it should GET a post by ID, USERID and TITLE', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get(`/posts?id=${postId}&userId=${userId}&title=${title}`)
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          done();
        });
    });
  it('it should NOT GET a post by WRONGID', (done) => {
      chai.request('https://jsonplaceholder.typicode.com')
        .get(`/posts/${wrongPostId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });


// //tests for POST	/posts - please create few tests (5 tests or more)
testCase('POST /posts', function(){ 
  it('it should POST a new post', (done) => {
      const post = {
        userId: 11,
        id: 101,
        title: "Lorem ipsum dolor sit amet",
        body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
      } 
      chai.request('https://jsonplaceholder.typicode.com')
        .post('/posts/')
        .send(post)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body['id'].should.be.a('number');
          res.body['userId'].should.be.a('number');
          res.body['title'].should.be.a('string');
          res.body['body'].should.be.a('string');         
          console.log(post)
          done();
        });
    });
  it('it should NOT POST a new post without ID', (done) => {
      const post = {
        userId: 11,
        title: "Lorem ipsum dolor sit amet",
        body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
      }
      chai.request('https://jsonplaceholder.typicode.com')
        .post('/posts/' + post.id)
        .send(post)
        .end((err, res) => {
          res.should.have.status(404);      
          console.log(post)
          done();
        });
    });
  it('it should NOT POST a new post without USERID', (done) => {
      const post = {
        id: 101,
        title: "Lorem ipsum dolor sit amet",
        body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
      }
      chai.request('https://jsonplaceholder.typicode.com')
        .post('/posts/' + post.id)
        .send(post)
        .end((err, res) => {
          res.should.have.status(404);      
          console.log(post)
          done();
        });
    });
  it('it should NOT POST a new post without TITLE or BODY', (done) => {
      const post = {
        userId: 11,
        id: 101,
        }
      chai.request('https://jsonplaceholder.typicode.com')
        .post('/posts/' + post.id)
        .send(post)
        .end((err, res) => {
          res.should.have.status(404);      
          console.log(post)
          done();
        });
    });
  it('it should NOT POST a new post with wrong ID or USERID', (done) => {
      const post = {
        userId: "wrong",
        id: "wrong",
        title: "Lorem ipsum dolor sit amet",
        body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
      }
      chai.request('https://jsonplaceholder.typicode.com')
        .post('/posts/' + post.id)
        .send(post)
        .end((err, res) => {
          res.should.have.status(404);    
          console.log(post)
          done();
        });
    });
});


//PUT	/posts/:id - please create few tests (3 tests or more)
testCase('PUT posts/:id', function(){
  it('it should PUT an existing post', (done) => {
      const post = {
        userId: 9,
        id: 85,
        title: "CHANGED Lorem ipsum dolor sit amet",
        body: "CHANGED Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
      }
      chai.request('https://jsonplaceholder.typicode.com')
        .put('/posts/' + post.id)
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          console.log(post)
          done();
        });
    });
  it('it should NOT PUT an existing post with wrong ID', (done) => {
      const post = {
        userId: 10,
        id: 115,
        title: "CHANGED Lorem ipsum dolor sit amet",
        body: "CHANGED Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
      }
      chai.request('https://jsonplaceholder.typicode.com')
        .put('/posts?id=' + post.id)
        .send(post)
        .end((err, res) => {
          res.should.have.status(404);
          console.log(post)
          done();
        });
    });
  it('it should NOT PUT an existing post with wrong USERID', (done) => {
      const post = {
        userId: 15,
        id: 60,
        title: "CHANGED Lorem ipsum dolor sit amet",
        body: "CHANGED Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
      }
      chai.request('https://jsonplaceholder.typicode.com')
        .put('/posts?userId=' + post.userId)
        .send(post)
        .end((err, res) => {
          res.should.have.status(404);
          console.log(post)
          done();
        });
    });
})

