package com.cisco.test;

import java.util.Iterator;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.cisco.dao.UserDAO;
import com.cisco.model.User;

public class UserTest {

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void createUserTest() {
		UserDAO userDAO = UserDAO.getInstance();
		User user = new User("utkarsh_kumar_1","utkakuma1@gmail.com","uk");
		userDAO.createUser(user);
	}
	
	@Test
	public void listUserTest() {
		UserDAO userDAO = UserDAO.getInstance();
		
		List<User> userList = userDAO.getUsers();
		
		Iterator<User> itr = userList.iterator();
		while(itr.hasNext()) {
			System.out.println(((User)itr.next()).toString());

		}		
	}
	
	@Test
	public void deleteUserTest() {
		UserDAO userDAO = UserDAO.getInstance();

	}

}
