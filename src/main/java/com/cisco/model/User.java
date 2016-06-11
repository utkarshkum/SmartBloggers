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
	
	@Id
	private ObjectId id;
	private String fullName;
	private String userName;
	private String emailId;
	private String password;
	@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="blogId")
	private Set<Blog> blogs;
	
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
		return "User [fullName=" + fullName + ", userName=" + userName
				+ ", emailId=" + emailId + ", password=" + password
				+ ", blogs=" + blogs + "]";
	}
	
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
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
