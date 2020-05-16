const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const collection = "city"

async function createNewCity(client, newCity) {
    const result = await client.db("new_world").collection("city").insertOne(newCity);
    console.log(`New city "${newCity.name}" is created.`);
}

async function updateCityByName(client, nameOfCity, updatedProperties) {
    const result = await client.db("new_world").collection("city").updateOne({ name: nameOfCity }, { $set: updatedProperties });;
    console.log(`${result.modifiedCount} city is updated`);
}

async function findCityByName(client, newCity) {
    const result = await client.db("new_world").collection("city").findOne({ name: newCity });
    if (result) {
        console.log(`Found a record in the ${collection} collection with name '${newCity}':`, result);
    } else {
        console.log(`No city found with the name '${newCity}'`);
    }
}

async function findCityByCountryCode(client, country_code) {
    const result = await client.db("new_world").collection("city").findOne({ countryCode: country_code });
    if (result) {
        console.log(`Found a city in the ${collection} collection with country code '${country_code}':`, result);
    } else {
        console.log(`No city found with the country code '${country_code}'`);
    }
}

async function deleteCity(client, cityName) {
    const result = await client
        .db("new_world").collection("city").deleteOne({ name: cityName });

    console.log(`${cityName} is deleted`);
}

async function seedDatabase() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();

        await createNewCity(client, {
            name: "Gebze",
            countryCode: "TUR",
            district: "Kocaeli",
            population: 1500000
        });

        await findCityByName(client, "Gebze");
        await updateCityByName(client, "Gebze", {population: 500000});
        await findCityByCountryCode(client, "TUR");
        await deleteCity(client, "Gebze");
        await findCityByName(client, "Gebze");

        await client.close();
    } catch (error) {
        console.log(error);
        await client.close();
    }
}
seedDatabase();


