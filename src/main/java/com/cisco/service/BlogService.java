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

import com.cisco.dao.BlogDAO;
import com.cisco.model.Blog;

@Path("/blogs")
public class BlogService {
	
	private BlogDAO blogDao = BlogDAO.getInstance();
	
	public BlogDAO getBlogDao() {
		return blogDao;
	}

	public void setBlogDao(BlogDAO blogDao) {
		this.blogDao = blogDao;
	}
	
	@GET
	@Path("/users/{param}")
	@Produces({MediaType.APPLICATION_JSON})
	public List<Blog> getBlogsWithUserName(@PathParam("param") String username) {
		return blogDao.getBlogsWithUserName(username);	
	}
	
	@GET
	@Path("/tags/{param}")
	@Produces({MediaType.APPLICATION_JSON})
	public List<Blog> getBlogsWithtags(@PathParam("param") String tags) {
		return blogDao.getBlogsWithtags(tags);	
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public List<Blog> getBlogs() {
		return blogDao.getBlogs();	
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void createBlog(Blog blog) {
		blogDao.createBlog(blog);	
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateBlog(Blog blog){
		blogDao.updateBlog(blog);
	}
	
	@DELETE
	@Produces({MediaType.APPLICATION_JSON})
	public boolean deleteBlog(Blog blog) {
		return blogDao.deleteBlog(blog);
	}
	
}


