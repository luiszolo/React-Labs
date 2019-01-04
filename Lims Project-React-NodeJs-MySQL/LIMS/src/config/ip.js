const os = require('os');
const ifaces = os.networkInterfaces();

let myIp = "localhost";

Object.keys(ifaces).forEach(ifname => {
	let alias = 0;

	ifaces[ifname].forEach(iface => {
		if('IPv4' !== iface.family || iface.internal !== false) return;
		if (alias >= 1) myIp = (ifname + ":" + alias, iface.address);
		else myIp = (ifname, iface.address);
		++alias;
	});
});

module.exports = myIp;
