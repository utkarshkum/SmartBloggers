package com.cisco.util;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class ServicesFactory {
	
	private static Datastore datastore;
	
	private static ThreadLocal<Datastore> mongoTL = new ThreadLocal<Datastore>();
	
	/**
	 * Method to retrieve a mongo database client from the thread local storage
	 * @return
	 */
	public static Datastore getMongoDB(){
		
		if (datastore != null) {
			return datastore;
		}
		
		if(mongoTL.get()==null){
			MongoClientURI connectionString = new MongoClientURI("mongodb://104.154.72.172:27017");
			MongoClient mongoClient = new MongoClient(connectionString);	
			Morphia morphia = new Morphia();
			morphia.mapPackage("com.cisco.model");
			datastore = morphia.createDatastore(mongoClient, "smdb");
			datastore.ensureIndexes();
			mongoTL.set(datastore);
			return datastore;
		}
		return mongoTL.get();
	}
	
}
