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
import com.cisco.model.User;

@Path("/blogs")
public class BlogService {
	
	private BlogDAO blogDao = new BlogDAO();
	
	public BlogDAO getBlogDao() {
		return blogDao;
	}

	public void setBlogDao(BlogDAO blogDao) {
		this.blogDao = blogDao;
	}

	@GET
	@Path("/{param}")
	@Produces({MediaType.APPLICATION_JSON})
	public Blog getBlog(@PathParam("param") Integer id) {
		return blogDao.getBlog(id);
		
	}
	
	@GET
	@Path("/user/{param}")
	@Produces({MediaType.APPLICATION_JSON})
	public List<Blog> getBlogWithUserID(@PathParam("param") Integer id) {
		return blogDao.getBlogsWithUserID(id);
		
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
	@Path("/{param}")
	@Produces({MediaType.APPLICATION_JSON})
	public boolean deleteBlog(@PathParam("param") Integer id) {
		return blogDao.deleteBlog(id);
	}
	
}


