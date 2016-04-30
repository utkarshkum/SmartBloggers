package com.cisco.model;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

public class Blog {
	
	private Integer blogId;
	private String title;
	private String content;
	private List<String> tag;
	private Timestamp postDate;
	
	@JsonIgnore
	@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="userId")
	private User user;
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Integer getBlogId() {
		return blogId;
	}
	public void setBlogId(Integer blogId) {
		this.blogId = blogId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getPostDate() {
		return postDate;
	}
	public void setPostDate(Timestamp postDate) {
		this.postDate = postDate;
	}
	public List<String> getTag() {
		return tag;
	}
	public void setTag(List<String> tag) {
		this.tag = tag;
	}
	
	@Override
	public String toString() {
		return "Blog [blogId=" + blogId + ", title=" + title + ", content="
				+ content + ", tag=" + tag + ", postDate=" + postDate
				+ ", user=" + user + "]";
	}
	
}
