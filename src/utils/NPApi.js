const API = '3c2cfd79eb68460fd757363cadd39525';

const baseUrl = 'https://api.novaposhta.ua/v2.0/json/';

const query = async (settings) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(settings)
    });

    const text = await response.text();
    return JSON.parse(text);
}


export const getCity = async (string) => {
    const data = {
        "apiKey": API,
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName": string,
            "Limit": 5
        }
    }

    const response = await query(data);
    console.log('citylist:', response.data);

    return response.data[0].Addresses;
}

export const getWarehouse = async (cityName) => {
    const data = {
        "modelName": "AddressGeneral",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityName": cityName,
            "Language": "ru"
        },
        "apiKey": API
    }

    const response = await query(data);

    console.log(response.data);
    return response.data;
}