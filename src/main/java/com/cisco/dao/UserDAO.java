package com.cisco.dao;

import java.util.List;

import org.mongodb.morphia.Datastore;

import com.cisco.model.User;
import com.cisco.util.ServicesFactory;


public class UserDAO {
	
	private static  UserDAO instance = new UserDAO();
	
	public static UserDAO getInstance() {
		return instance;
	}
	
	private UserDAO() {
		
	}
	
	public User getUser(Integer id) {
		return null;
	}
		
	public List<User> getUsers() {
		Datastore dataStore = ServicesFactory.getMongoDB();
		return dataStore.find(User.class).asList();
	}
	
	
	public void createUser(User user) {
		Datastore dataStore = ServicesFactory.getMongoDB();
		dataStore.save(user);
	}
	
	public void updateUser(User u) {

	}
	
	public boolean deleteUser(int id) {
		return true;
	}
	
}
