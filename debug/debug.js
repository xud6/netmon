var snmp = require('snmp-native');

var session = new snmp.Session({ host: '10.8.20.1', port: 161, community: 'xudaiqing' });

session.getSubtree({ oid: [1, 3] }, function (error, varbinds) {
    if (error) {
        console.log('Fail :(');
    } else {
        varbinds.forEach(function (vb) {
            console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
        });
    }
});