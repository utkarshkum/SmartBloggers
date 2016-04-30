package com.cisco.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Field;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Index;
import org.mongodb.morphia.annotations.Indexes;

@Entity("users")
@Indexes(
    @Index(value = "userName", fields = @Field("userName"))
)
public class User {
	
	public User() 
	{	
	}
	
	public User(String userName, String emailId, String password) {
		super();
		this.userName = userName;
		this.emailId = emailId;
		this.password = password;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", emailId="
				+ emailId + ", password=" + password + ", blogs=" + blogs + "]";
	}
	@Id
	private ObjectId id;
	private String userName;
	private String emailId;
	private String password;
	
	@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="blogId")
	private Set<Blog> blogs;
	
	public Set<Blog> getBlogs() {
		return blogs;
	}
	public void setBlogs(Set<Blog> blogs) {
		this.blogs = blogs;
	}

	public String getUserName() {
		return userName;
	}
	public void setName(String userName) {
		this.userName = userName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}	
}
