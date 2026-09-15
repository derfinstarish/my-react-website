const http = require('http');

const PORT = process.env.PORT || 3000;
const WHATSAPP_NUMBER = '919600416662'; // India country code + 9600416662

function readBody(request) {
	return new Promise((resolve, reject) => {
		let body = '';
		request.setEncoding('utf8');
		request.on('data', chunk => {
			body += chunk;
			if (body.length > 1024 * 1024) {
				request.destroy();
				reject(new Error('Request body is too large'));
			}
		});
		request.on('end', () => resolve(body));
		request.on('error', reject);
	});
}

function getDetails(body, contentType) {
	if (contentType.includes('application/json')) return JSON.parse(body || '{}');
	return Object.fromEntries(new URLSearchParams(body));
}

const server = http.createServer(async (request, response) => {
	if (request.method !== 'POST' || request.url !== '/consultation') {
		response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
		return response.end('Not found');
	}

	try {
		const details = getDetails(
			await readBody(request),
			request.headers['content-type'] || ''
		);
		const message = [
			'New consultation request',
			...Object.entries(details).map(([key, value]) => `${key}: ${value}`)
		].join('\n');
		// Use WhatsApp's universal send endpoint for better compatibility on mobile browsers.
		const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

		response.writeHead(302, { Location: whatsappUrl });
		response.end();
	} catch (error) {
		response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
		response.end(JSON.stringify({ error: 'Invalid consultation details' }));
	}
});

server.listen(PORT, () => {
	console.log(`Consultation server running on port ${PORT}`);
});
