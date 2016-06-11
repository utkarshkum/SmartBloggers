package com.cisco.service;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.cisco.dao.UserDAO;
import com.cisco.model.User;

@Path("/users")
public class UserService {
	
	@GET
	@Path("/{param}")
	@Produces({MediaType.APPLICATION_JSON})
	public User getUser(@PathParam("param") String username) {
		UserDAO userData = UserDAO.getInstance();
		return userData.getUser(username);
		
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public List<User> getUsers() {
		UserDAO userData = UserDAO.getInstance();
		return userData.getUsers();
		
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void createUser(User u){
		UserDAO userData = UserDAO.getInstance();
		userData.createUser(u);
		
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateUser(User u){
		UserDAO userData = UserDAO.getInstance();
		userData.updateUser(u);
	}
	
	@DELETE
	@Produces({MediaType.APPLICATION_JSON})
	public boolean deleteUser(User user) {
		UserDAO userData = UserDAO.getInstance();
		return userData.deleteUser(user);
	}
	
}


