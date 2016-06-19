package com.cisco.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;

import com.cisco.model.Blog;
import com.cisco.model.User;
import com.cisco.util.ServicesFactory;
import com.mongodb.BasicDBObject;


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
	
	public List<Blog> getBlogsWithUserName(String username) {
		Datastore dataStore = ServicesFactory.getMongoDB();
		Query query = dataStore.createQuery(Blog.class).field("userName").equal(username);
		return query.asList();	
	}
	
	public List<Blog> getBlogsWithtags(String tags) {
		
		if (tags == null) {
			return null;
		}
		
		tags = tags.toLowerCase();
		
		String[] tagsList = tags.split("[\\s+,+]");
		Datastore dataStore = ServicesFactory.getMongoDB();
		
		List<Blog> bloglist = dataStore.find(Blog.class).asList();
		Set<Blog> setFilteredbloglist = new HashSet<Blog>();
		List<Blog> listFilteredbloglist = new ArrayList<Blog>();
		
		for(String tag:tagsList) {
			if (tag.length() != 0) {
				Iterator itr = bloglist.iterator();
				while(itr.hasNext()) {
					Blog blog = (Blog) itr.next();
					if(blog.getTag()!=null && blog.getTag().contains(tag)) {
						if (setFilteredbloglist.add(blog)) {
							listFilteredbloglist.add(blog);
						}
					}
				}
			}
		}
				
		return listFilteredbloglist;
	}
	
	
	public List<Blog> getBlogs() {
		Datastore dataStore = ServicesFactory.getMongoDB();
		return dataStore.find(Blog.class).asList();
	}
	
	
	public void createBlog(Blog blog){
		Datastore dataStore = ServicesFactory.getMongoDB();
		
		if (blog.getTag() != null) {
			blog.setTag(blog.getTag().toLowerCase());
		}
		
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
