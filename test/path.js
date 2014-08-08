
var purest = require('../lib/provider');


describe('path', function () {
    describe('type', function () {
        it('version/endpoint.json', function () {
            var p = new purest({provider:'twitter'});
            p.createPath('endpoint').should.equal(p.version+'/endpoint.json');
        });
        it('version/endpoint', function () {
            var p = new purest({provider:'linkedin'});
            p.createPath('endpoint').should.equal(p.version+'/endpoint');
        });

        it('api/version/endpoint.json', function () {
            var p = new purest({provider:'stocktwits'});
            p.createPath('endpoint').should.equal('api/'+p.version+'/endpoint.json');
        });
        it('api/version/endpoint', function () {
            var p = new purest({provider:'asana'});
            p.createPath('endpoint').should.equal('api/'+p.version+'/endpoint');
        });
        it('api/endpoint', function () {
            var p = new purest({provider:'slack'});
            p.createPath('endpoint').should.equal('api/endpoint');
        });

        it('endpoint.json', function () {
            var p = new purest({provider:'soundcloud'});
            p.createPath('endpoint').should.equal('endpoint.json');
        });
        it('endpoint', function () {
            var p = new purest({provider:'facebook'});
            p.createPath('endpoint').should.equal('endpoint');
        });
    });
    
    describe('options', function () {
        it('set version through options', function () {
            var p = new purest({provider:'linkedin'});
            p.createPath('endpoint',{version:'2.2'}).should.equal('2.2/endpoint');
        });
    });

    describe('same domain', function () {
        it('apiname/version/endpoint - apiname set in the ctor', function () {
            var apis = ['plus', 'youtube', 'drive', 'freebase', 'pagespeedonline'],
                google = require('../config/providers').google;
            for (var i=0; i < apis.length; i++) {
                var p = new purest({provider:'google', api:apis[i]});
                p.createPath('endpoint',{})
                    .should.equal(apis[i]+'/'+google.api[apis[i]].version+'/endpoint');
            }
        });
        it('apiname/version/endpoint - api set through options', function () {
            var apis = ['plus', 'youtube', 'drive', 'freebase', 'pagespeedonline'],
                google = require('../config/providers').google;
            for (var i=0; i < apis.length; i++) {
                var p = new purest({provider:'google'});
                p.createPath('endpoint',{api:apis[i]})
                    .should.equal(apis[i]+'/'+google.api[apis[i]].version+'/endpoint');
            }
        });
        it('set version through options', function () {
            var p = new purest({provider:'google'});
            p.createPath('api/method',{api:'freebase', version:'4.4'})
                .should.equal('freebase/4.4/api/method');
        });
    });

    describe('url', function () {
        it('get domain from provider.api.name.domain', function () {
            var p = new purest({provider:'google'});
            p.url('api/method', {api:'plus'})
                .should.equal('https://www.googleapis.com/plus/v1/api/method')
        });
        it('get domain from provider.domain', function () {
            var p = new purest({provider:'google'});
            p.url('api/method', {api:'m8/feeds'})
                .should.equal('https://www.google.com/m8/feeds/api/method');
        });
    });
});
