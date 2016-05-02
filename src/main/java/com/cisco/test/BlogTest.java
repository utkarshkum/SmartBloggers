package com.cisco.test;

import static org.junit.Assert.*;

import java.util.Iterator;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.cisco.dao.BlogDAO;
import com.cisco.dao.UserDAO;
import com.cisco.model.Blog;
import com.cisco.model.User;

public class BlogTest {

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}
	
	@Test
	public void createBlogTest() {
		BlogDAO blogDAO = BlogDAO.getInstance();
		Blog blog = new Blog("Title_20","Content_20","Tag_20");
		blogDAO.createBlog(blog);
	}
	
	@Test
	public void listUserTest() {
		BlogDAO blogDAO = BlogDAO.getInstance();
		
		List<Blog> blogList = blogDAO.getBlogs();
		
		Iterator<Blog> itr = blogList.iterator();
		while(itr.hasNext()) {
			System.out.println(((Blog)itr.next()).toString());

		}		
	}

	@Test
	public void test() {
		fail("Not yet implemented");
	}

}
