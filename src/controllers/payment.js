const https = require('https');
const crypto = require('crypto');
const momoConfig = require('../config/momo.config');

exports.createPayment = ({ amount, orderId }) => {
    return new Promise((resolve, reject) => {

        const requestId = orderId;
        const orderInfo = `Thanh toán đơn hàng ${orderId}`;
        const extraData = '';

        const rawSignature =
            `accessKey=${momoConfig.accessKey}` +
            `&amount=${amount}` +
            `&extraData=${extraData}` +
            `&ipnUrl=${momoConfig.ipnUrl}` +
            `&orderId=${orderId}` +
            `&orderInfo=${orderInfo}` +
            `&partnerCode=${momoConfig.partnerCode}` +
            `&redirectUrl=${momoConfig.redirectUrl}` +
            `&requestId=${requestId}` +
            `&requestType=${momoConfig.requestType}`;

        const signature = crypto
            .createHmac('sha256', momoConfig.secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = JSON.stringify({
            partnerCode: momoConfig.partnerCode,
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl: momoConfig.redirectUrl,
            ipnUrl: momoConfig.ipnUrl,
            requestType: momoConfig.requestType,
            extraData,
            lang: momoConfig.lang,
            signature
        });

        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };

        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });

        req.on('error', reject);
        req.write(requestBody);
        req.end();
    });
};
