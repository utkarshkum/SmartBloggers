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


@Path("/register")
public class RegisterService {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void createUser(User u){
		UserDAO userData = UserDAO.getInstance();
		userData.createUser(u);
		
	}

}

