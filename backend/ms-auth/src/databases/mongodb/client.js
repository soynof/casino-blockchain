import CONFIG from '../../config.js';
import { MongoClient } from 'mongodb';

class MongoDB {
	static #mongoClient;

	static isInitialized() {
		return this.#mongoClient !== undefined;
	}

	static async getDB() {
		if (this.isInitialized()) {
			return this.#mongoClient.db(CONFIG.MONGODB.DATABASE);
		}

		this.#mongoClient = new MongoClient(CONFIG.MONGODB.CONNECTIONSTRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		
		await this.#mongoClient.connect();

		return this.#mongoClient.db(CONFIG.MONGODB.DATABASE);
	}

}

export default MongoDB;