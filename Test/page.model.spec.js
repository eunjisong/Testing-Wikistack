const expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var models = require('../models');
var Page = models.Page;


describe('Page Model', function(){
  describe('virtual Methods', function(){
    let page;
    beforeEach(function(){
        page = Page.build();
    })
        describe('Route Testing',function(){
            it('testing virtual rout', function(){
                page.urlTitle = "my_first_test_exp";
                console.log(page.route);
                expect(page.route).to.be.equal('/wiki/my_first_test_exp')
            });
        })

        describe('Rendering Testing', function(){
            it('testing virtual rendering', function(){
                page.content = "this is just for testing not sure if it works"
                expect(page.renderedContent).to.be.equal('<p>this is just for testing not sure if it works</p>\n');
            })
        })
    })

    describe('Test Class Methods', function(){
        describe('Test Class Methods', function(done){
            before(function (done) {
                Page.create({
                title: 'foo',
                content: 'bar',
                tags: ['foo', 'bar']
                })
                .then(function () {
                done();
                })
                .catch(done);
            });

            // afterEach(function(done){
            //     Page.destroy({
            //         where: {
            //             content : 'bar'
            //         }
            //     }).then(function(){
            //         done();
            //     }).catch(done);
            // })
    
            it('gets pages with the search tag', function (done) {
                Page.findByTag('bar')
                .then(function (pages) {
                  expect(pages).to.have.lengthOf(1);
                  done();
                })
                .catch(done);
              });

              it('does not get pages without the search tag', function (done) {
                Page.findByTag('falafel')
                .then(function (pages) {
                  expect(pages).to.have.lengthOf(0);
                  done();
                })
                .catch(done);
              });
        
    })
        
    })

    describe('Validation', function(){
        describe('Page Validatio', function(){
            var page;
            beforeEach(function () {
            page = Page.build();
            });
            it('errors without title', function (done) {
                page.validate()
                .catch(function(err){
                    expect(err).to.exist;
                    expect(err.errors).to.exist;
                    expect(err.errors[0].path).to.equal('title');
                    done();
                });
            });

            it('errors with Hook', function () {
                Page.afterValidate(page,'title');
                expect(page.urlTitle).to.be.not.equal('undefined')   ;             
            });
        });
    });

})
