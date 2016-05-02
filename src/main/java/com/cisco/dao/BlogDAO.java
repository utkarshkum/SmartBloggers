package com.cisco.dao;

import java.util.List;

import org.mongodb.morphia.Datastore;

import com.cisco.model.Blog;
import com.cisco.model.User;
import com.cisco.util.ServicesFactory;


public class BlogDAO {
	
	private static  BlogDAO instance = new BlogDAO();
	
	public static BlogDAO getInstance() {
		return instance;
	}
	
	private BlogDAO() {
		
	}
	
	public Blog getBlog(Integer id) {
		Datastore dataStore = ServicesFactory.getMongoDB();

		return null;

	}
	
	public List<Blog> getBlogsWithUserID(Integer userId) {
		Datastore dataStore = ServicesFactory.getMongoDB();
		return null;
	}
	
	
	public List<Blog> getBlogs() {
		Datastore dataStore = ServicesFactory.getMongoDB();
		return dataStore.find(Blog.class).asList();
	}
	
	
	public void createBlog(Blog blog){
		Datastore dataStore = ServicesFactory.getMongoDB();
		dataStore.save(blog);
	}
	
	public void updateBlog(Blog blog){
		Datastore dataStore = ServicesFactory.getMongoDB();


	}
	
	
	public boolean deleteBlog(Blog blog) {
		Datastore dataStore = ServicesFactory.getMongoDB();
		dataStore.delete(blog);	
		return true;
	}
}
