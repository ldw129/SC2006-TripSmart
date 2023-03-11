const { TransportApi, Configuration } = require('../../../sdk/api-gojek-node');

const configuration = new Configuration({
    accessToken: process.env.GOJEK_ACCESS_TOKEN
});

const transportAPI = new TransportApi(configuration);

const defaultHeaders = {
    xAppid: 'com.gojek.app',
    xAppversion: '4.59.1',
    xDeviceos: 'Android,10',
    xPhonemake: 'Samsung',
    xPhonemodel: 'GT-S7500',
    xPlatform: 'Android',
    xPushtokentype: 'FCM',
    xUniqueid: '95f99ddd6a5d34a9',
    xUserType: 'customer',
    xSessionId: 'd31cc210-a067-4d0d-a52f-199880ea8907',
    gojekCountryCode: 'ID'
};

const getDropoffSpots = async () => {
    
    const getDropoffSpotsResponse = await transportAPI.getDropoffSpots({
        ...defaultHeaders,
        location: '-6.184608,106.736176',
        serviceType: 1
    });

    console.log(JSON.stringify(getDropoffSpotsResponse.data));
};

getDropoffSpots();