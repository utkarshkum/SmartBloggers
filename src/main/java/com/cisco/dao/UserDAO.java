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
		Datastore dataStore = ServicesFactory.getMongoDB();

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
	
	public void updateUser(User user) {
		Datastore dataStore = ServicesFactory.getMongoDB();
		//dataStore.update(user,1	);
	}
	
	public boolean deleteUser(User user) {
		Datastore dataStore = ServicesFactory.getMongoDB();
		dataStore.delete(user);	
		return true;
	}
	
	public boolean validateUser(User user) {
		Datastore dataStore = ServicesFactory.getMongoDB();
		List<User> filteredUser = dataStore.find(User.class)
						.filter("userName", user.getUserName()).
						filter("password", user.getPassword()).asList();
		
		if (filteredUser.size() ==1) {
			return true;
		}
		return false;
		
	}
	
}
