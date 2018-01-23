const expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);


describe('Simple Test',function(){
    it('will add 2 into 2 and will give result as 4', function(){
        expect(2+2).to.equal(4);    
    })
})

describe('Asyncronous test', function(){
    it('shoult timeout in 1000 milli seconds', function(done){
        var start = new Date();
        var result = setTimeout(() => {
            var duration = new Date() - start;
            expect(duration).to.be.closeTo(1000, 50);
            done();
        }, 1000);
    })
})


describe('spy function',function(){
    it('will invoke a function once per element', function () {
        var myArray = ['1','2','3','5'];
        function logArray(val){
            console.log(val);
        }
        var spyLog = chai.spy(logArray);
        myArray.forEach(spyLog);
        expect(spyLog).to.have.been.called.exactly(myArray.length); 
    })
})
